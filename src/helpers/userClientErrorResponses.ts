import validateUUID from './validateUUID';
import db from 'src/db/db';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const userClientErrorResponses = (id: string) => {
  if (!validateUUID(id)) {
    throw new BadRequestException('Not valid ID');
  }
  const user = db.users.find((user) => user.id === id);
  if (!user) {
    throw new NotFoundException('User not found');
  }
  return user;
};

export default userClientErrorResponses;
