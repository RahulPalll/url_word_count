import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async register(username: string, password: string): Promise<any> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { username },
      });
      if (existingUser) {
        throw new BadRequestException('Username is already taken.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({
        username,
        password: hashedPassword,
      });
      await this.userRepository.save(user);
      return { message: 'User registered successfully' };
    } catch (error) {
      throw new BadRequestException(error.message || 'Registration failed.');
    }
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Users | null> {
    try {
      const user = await this.userRepository.findOne({ where: { username } });
      if (!user) {
        throw new UnauthorizedException('Invalid username or password.');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid username or password.');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Validation failed.');
    }
  }

  async login(users: Users): Promise<{ accessToken: string }> {
    try {
      const payload = { username: users.username, sub: users.id };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Login failed.');
    }
  }
}
