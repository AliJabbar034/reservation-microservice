import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { User } from './user/model/user.model';
import { UserService } from './user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  async login(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign({
        ...payload,
        expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      }),
      refresh_token: this.jwtService.sign({
        ...payload,
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME'),
      }),
    };
  }
}
