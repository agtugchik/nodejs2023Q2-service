import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { IUserWithoutPassword } from 'src/types/usersTypes';
import CreateUserDto from '../dto/createUser.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly appService: UsersService) {}

  @Get('user')
  getUsers(): Array<IUserWithoutPassword> {
    return this.appService.getUsers();
  }

  @Get('user/:id')
  getUser(@Param('id') id: string): IUserWithoutPassword {
    return this.appService.getUser(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('user')
  create(@Body() dto: CreateUserDto) {
    return this.appService.createUser(dto);
  }

  @Delete('user/:id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    this.appService.deleteUser(id);
  }
}
