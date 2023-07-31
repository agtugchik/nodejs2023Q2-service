import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import IUser, { IUserWithoutPassword } from 'src/types/usersTypes';
import db from 'src/db/db';
import getUserWithoutPass from 'src/helpers/getUserWithoutPass';
import CreateUserDto from 'src/dto/createUser.dto';
import { v4 } from 'uuid';
import clientErrorResponses from 'src/helpers/clientErrorResponses';
import UpdatePasswordDto from 'src/dto/updatePassword.dro';

@Injectable()
export class UsersService {
  getUsers(): Array<IUserWithoutPassword> {
    return db.users.map((user) => getUserWithoutPass(user));
  }

  getUser(id: string): IUserWithoutPassword {
    const user = clientErrorResponses(id, 'users') as IUser;
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
    clientErrorResponses(id, 'users');
    db.users = db.users.filter((user) => user.id !== id);
  }

  updatePassword(dto: UpdatePasswordDto, id: string) {
    if (!dto.newPassword || !dto.oldPassword) throw new BadRequestException('');
    const user = clientErrorResponses(id, 'users') as IUser;
    if (user.password !== dto.oldPassword)
      throw new ForbiddenException('Wrong password');
    user.password = dto.newPassword;
    user.version++;
    user.updatedAt = Date.now();
    return getUserWithoutPass(user);
  }
}
