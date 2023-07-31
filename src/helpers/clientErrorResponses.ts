import validateUUID from './validateUUID';
import db from 'src/db/db';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import IUser from 'src/types/usersTypes';
import ITrack from 'src/types/trackType';

const clientErrorResponses = (
  id: string,
  type: 'users' | 'tracks',
): IUser | ITrack => {
  if (!validateUUID(id)) {
    throw new BadRequestException('Not valid ID');
  }
  const item = (db[type] as []).find((item) => (item as any).id === id);
  if (!item) {
    throw new NotFoundException('Not found');
  }
  return item;
};

export default clientErrorResponses;
