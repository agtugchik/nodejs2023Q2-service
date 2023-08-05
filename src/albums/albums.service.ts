import { Injectable } from '@nestjs/common';
import db from 'src/db/db';
import CreateAlbumDto from 'src/dto/createAlbum.dto';
import clientErrorResponses from 'src/helpers/clientErrorResponses';
import IAlbum from 'src/types/albumeType';
import { v4 } from 'uuid';

@Injectable()
export class AlbumsService {
  getAlbums() {
    return db.tracks;
  }

  getAlbum(id: string) {
    const album = clientErrorResponses(id, 'albums') as IAlbum;
    return album;
  }

  createAlbum(dto: CreateAlbumDto) {
    const newAlbum = {
      id: v4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    };
    db.albums.push(newAlbum);
    return newAlbum;
  }

  deleteAlbum(id: string) {
    clientErrorResponses(id, 'albums');
    db.albums = db.albums.filter((album) => album.id !== id);
    db.tracks = db.tracks.map((track) => {
      if (track.albumId === id) track.albumId = null;
      return track;
    });
  }

  updateAlbum(dto: CreateAlbumDto, id: string) {
    const album = clientErrorResponses(id, 'albums') as IAlbum;
    album.name = dto.name;
    album.year = dto.year;
    album.artistId = dto.artistId;
    return album;
  }
}
