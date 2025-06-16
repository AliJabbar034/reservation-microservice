import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    return this.authService.login(req?.user);
  }

  @MessagePattern('auth_login')
  @UseGuards(JwtAuthGuard)
  async getUser(@Payload() data: any) {
    try {
      console.log(data);
      return { isValid: true, user: data };
    } catch (error) {
      return { isValid: false, message: error.message };
    }
  }
}
