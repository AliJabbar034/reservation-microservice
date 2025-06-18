import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';

import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const response: any = await firstValueFrom(
        this.client
          .send('auth_login', {
            Authentication: token,
            headers: request.headers,
          })
          .pipe(
            catchError((err) => {
              console.log('Auth service error:', err);
              throw new UnauthorizedException('Invalid token');
            }),
          ),
      );

      if (response?.isValid) {
        // ✅ Attach user to request
        request.user = response.user;
        return true;
      }

      throw new UnauthorizedException('Invalid token');
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
