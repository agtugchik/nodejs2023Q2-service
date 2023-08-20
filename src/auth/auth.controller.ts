import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  ValidationError,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import CreateUserDto from '../dto/createUser.dto';
import { Public } from './publicDecorator';
import AuthRefreshDto from 'src/dto/authRefresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UsePipes(new ValidationPipe())
  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    return await this.authService.signup(dto);
  }

  @Public()
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() dto: CreateUserDto) {
    return await this.authService.login(dto);
  }

  @UsePipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new UnauthorizedException(validationErrors);
      },
    }),
  )
  @Post('refresh')
  async refresh(@Body() dto: AuthRefreshDto) {
    return await this.authService.refresh(dto);
  }
}
