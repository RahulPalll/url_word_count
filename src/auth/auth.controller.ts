import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    schema: { example: { username: 'testuser', password: 'password123' } },
  })
  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    try {
      return await this.authService.register(username, password);
    } catch (error) {
      throw new BadRequestException(error.message || 'Registration failed.');
    }
  }

  @ApiBody({
    schema: { example: { username: 'testuser', password: 'password123' } },
  })
  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    try {
      const user = await this.authService.validateUser(username, password);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return await this.authService.login(user);
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Login failed.');
    }
  }
}
