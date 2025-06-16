import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    const existingUser = await this.findByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    try {
      const newUser = this.userRepository.create({
        ...user,
        password: await hash(user.password, 10),
      });
      await this.userRepository.save(newUser);
      return {
        message: 'User created successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating user',
        error.message,
      );
    }
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
