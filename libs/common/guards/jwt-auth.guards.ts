import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';

import { firstValueFrom, Observable, tap } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      //  s

      const response = await firstValueFrom(
        this.client.send('auth_login', token),
      );
      console.log('response', response);
      if (!response?.isValid) {
        throw new UnauthorizedException(response?.message || 'Invalid token');
      }

      request['user'] = response.user;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log('extractTokenFromHeader', type, token);
    return type === 'Bearer' ? token : undefined;
  }
}
