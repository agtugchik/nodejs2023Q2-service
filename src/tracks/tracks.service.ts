import { Injectable } from '@nestjs/common';
import db from 'src/db/db';
import CreateTrackDto from 'src/dto/createTrack.dto';
import clientErrorResponses from 'src/helpers/clientErrorResponses';
import ITrack from 'src/types/trackType';
import { v4 } from 'uuid';

@Injectable()
export class TracksService {
  getTracks() {
    return db.tracks;
  }

  getTrack(id: string) {
    const track = clientErrorResponses(id, 'tracks') as ITrack;
    return track;
  }

  createTrack(dto: CreateTrackDto) {
    const newTrack = {
      id: v4(),
      name: dto.name,
      artistId: dto.artistId,
      albumId: dto.albumId,
      duration: dto.duration,
    };
    db.tracks.push(newTrack);
    return newTrack;
  }

  deleteTrack(id: string) {
    clientErrorResponses(id, 'tracks');
    db.tracks = db.tracks.filter((user) => user.id !== id);
  }

  updateTrack(dto: CreateTrackDto, id: string) {
    // if (!dto.newPassword || !dto.oldPassword) throw new BadRequestException('');
    const track = clientErrorResponses(id, 'tracks') as ITrack;
    // if (user.password !== dto.oldPassword)
    //   throw new ForbiddenException('Wrong password');
    // user.password = dto.newPassword;
    // user.version++;
    // user.updatedAt = Date.now();
    track.id = v4();
    track.name = dto.name;
    track.duration = dto.duration;
    track.artistId = dto.artistId;
    track.albumId = dto.albumId;
    return dto;
  }
}
