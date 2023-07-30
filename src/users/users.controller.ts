import { Controller, Get, Param } from '@nestjs/common';
import { IUserWithoutPassword } from 'src/types/usersTypes';
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
}
