import { Injectable } from '@nestjs/common';
import IUser from 'src/types/usersTypes';
import db from 'src/db/db';

@Injectable()
export class UsersService {
  getUsers(): Array<IUser> {
    return db.users;
  }
  getUser(id: string): IUser | undefined {
    const user = db.users.find((user) => user.id === id);
    return user;
  }
}
