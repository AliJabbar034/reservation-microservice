import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() req: any) {
    return {
      message: 'User fetched successfully',
      user: req?.user,
    };
  }
}
