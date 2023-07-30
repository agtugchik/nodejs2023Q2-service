import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserWithoutPassword } from 'src/types/usersTypes';
import db from 'src/db/db';
import validateUUID from 'src/helpers/validateUUID';
import getUserWithoutPass from 'src/helpers/getUserWithoutPass';

@Injectable()
export class UsersService {
  getUsers(): Array<IUserWithoutPassword> {
    return db.users.map((user) => getUserWithoutPass(user));
  }
  getUser(id: string): IUserWithoutPassword {
    if (!validateUUID(id)) {
      throw new BadRequestException('Not valid ID');
    }
    const user = db.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return getUserWithoutPass(user);
  }
}
