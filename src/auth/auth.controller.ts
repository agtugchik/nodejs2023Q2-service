import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import CreateUserDto from '../dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    return await this.authService.signup(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() dto: CreateUserDto) {
    return await this.authService.login(dto);
  }
}
