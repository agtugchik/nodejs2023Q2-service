import validateUUID from './validateUUID';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';

const errorResponses = async (
  id: string,
  type: 'user' | 'album' | 'artist' | 'track',
  repository: Repository<UserEntity | AlbumEntity | ArtistEntity | TrackEntity>,
) => {
  if (!validateUUID(id)) {
    throw new BadRequestException(`Invalid ${type} id`);
  }

  const item = await repository.findOne({ where: { id } });

  if (!item) {
    throw new NotFoundException(
      `${type[0].toUpperCase() + type.slice(1)} not found`,
    );
  }
  return item;
};

export default errorResponses;
