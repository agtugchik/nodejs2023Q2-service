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
import CreateUserDto from '../dto/createUser.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('user')
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get('user/:id')
  async getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('user')
  async createUser(@Body() dto: CreateUserDto) {
    return await this.usersService.createUser(dto);
  }

  @Delete('user/:id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
  }

  @Put('user/:id')
  async updatePassword(
    @Body() dto: UpdatePasswordDto,
    @Param('id') id: string,
  ) {
    return this.usersService.updatePassword(dto, id);
  }
}
