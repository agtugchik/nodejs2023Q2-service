import { Controller, Get, Param } from '@nestjs/common';
import IUser from 'src/types/usersTypes';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly appService: UsersService) {}

  @Get('user')
  getUsers(): Array<IUser> {
    return this.appService.getUsers();
  }
  @Get('user/:id')
  getUser(@Param('id') id: string): IUser | undefined {
    return this.appService.getUser(id);
  }
}
