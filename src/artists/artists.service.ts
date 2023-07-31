import { Injectable } from '@nestjs/common';
import db from 'src/db/db';
import CreateArtistDto from 'src/dto/createArtist.dto';
import clientErrorResponses from 'src/helpers/clientErrorResponses';
import IArtist from 'src/types/artistType';
import { v4 } from 'uuid';

@Injectable()
export class ArtistsService {
  getArtists() {
    return db.artists;
  }

  getArtist(id: string): IArtist {
    const artist = clientErrorResponses(id, 'artists') as IArtist;
    return artist;
  }

  createArtist(dto: CreateArtistDto) {
    const newArtist = {
      id: v4(),
      name: dto.name,
      grammy: dto.grammy,
    };
    db.artists.push(newArtist);
    return newArtist;
  }

  deleteArtist(id: string) {
    clientErrorResponses(id, 'artists');
    db.artists = db.artists.filter((artist) => artist.id !== id);
    db.tracks = db.tracks.map((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
      return track;
    });
  }

  updateArtist(dto: CreateArtistDto, id: string) {
    const artist = clientErrorResponses(id, 'artists') as IArtist;
    artist.name = dto.name;
    artist.grammy = dto.grammy;
    return artist;
  }
}
