import { Injectable } from '@nestjs/common';
import { IUserWithoutPassword } from 'src/types/usersTypes';
import db from 'src/db/db';
import getUserWithoutPass from 'src/helpers/getUserWithoutPass';
import CreateUserDto from 'src/dto/createUser.dto';
import { v4 } from 'uuid';
import userClientErrorResponses from 'src/helpers/userClientErrorResponses';

@Injectable()
export class UsersService {
  getUsers(): Array<IUserWithoutPassword> {
    return db.users.map((user) => getUserWithoutPass(user));
  }

  getUser(id: string): IUserWithoutPassword {
    const user = userClientErrorResponses(id);
    return getUserWithoutPass(user);
  }

  createUser(dto: CreateUserDto) {
    const date = Date.now();
    const newUser = {
      id: v4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: date,
      updatedAt: date,
    };
    db.users.push(newUser);
    return getUserWithoutPass(newUser);
  }

  deleteUser(id: string) {
    userClientErrorResponses(id);
    db.users = db.users.filter((user) => user.id !== id);
  }
}
