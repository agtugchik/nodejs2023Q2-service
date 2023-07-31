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
  Put,
} from '@nestjs/common';
import UpdatePasswordDto from 'src/dto/updatePassword.dro';
import { IUserWithoutPassword } from 'src/types/usersTypes';
import CreateUserDto from '../dto/createUser.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('user')
  getUsers(): Array<IUserWithoutPassword> {
    return this.usersService.getUsers();
  }

  @Get('user/:id')
  getUser(@Param('id') id: string): IUserWithoutPassword {
    return this.usersService.getUser(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('user')
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Delete('user/:id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    this.usersService.deleteUser(id);
  }

  @Put('user/:id')
  updatePassword(@Body() dto: UpdatePasswordDto, @Param('id') id: string) {
    return this.usersService.updatePassword(dto, id);
  }
}
