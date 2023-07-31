import validateUUID from './validateUUID';
import db from 'src/db/db';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import IUser from 'src/types/userTypes';
import ITrack from 'src/types/trackType';
import IArtist from 'src/types/artistType';
import IAlbum from 'src/types/albumetype';

const clientErrorResponses = (
  id: string,
  type: 'users' | 'tracks' | 'artists' | 'albums',
): IUser | ITrack | IArtist | IAlbum => {
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
