import {
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import db from 'src/db/db';
import validateUUID from 'src/helpers/validateUUID';
import { IFavoritesEntities } from 'src/types/favouritesType';

@Injectable()
export class FavoritesService {
  getFavorites() {
    const favsEntities: IFavoritesEntities = {
      artists: [],
      albums: [],
      tracks: [],
    };

    db.favs.artists.forEach((artistId) =>
      favsEntities.artists.push(
        db.artists.find((artist) => artist.id === artistId),
      ),
    );
    favsEntities.artists = favsEntities.artists.filter((artist) => !!artist);

    db.favs.albums.forEach((albumId) =>
      favsEntities.albums.push(db.albums.find((album) => album.id === albumId)),
    );

    favsEntities.albums = favsEntities.albums.filter((album) => !!album);

    db.favs.tracks.forEach((trackId) =>
      favsEntities.tracks.push(db.tracks.find((track) => track.id === trackId)),
    );

    favsEntities.tracks = favsEntities.tracks.filter((track) => !!track);

    console.log(favsEntities);

    return favsEntities;
  }

  addTrackToFavs(id: string) {
    if (!validateUUID(id)) {
      throw new BadRequestException('Not valid ID');
    }
    const track = db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new UnprocessableEntityException('');
    }

    db.favs.tracks.push(id);
  }

  addAlbumToFavs(id: string) {
    if (!validateUUID(id)) {
      throw new BadRequestException('Not valid ID');
    }
    const album = db.albums.find((album) => album.id === id);
    if (!album) {
      throw new UnprocessableEntityException('');
    }

    db.favs.albums.push(id);
  }

  addArtistToFavs(id: string) {
    if (!validateUUID(id)) {
      throw new BadRequestException('Not valid ID');
    }
    const artist = db.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new UnprocessableEntityException('Unprocessable Entity');
    }

    db.favs.artists.push(id);
  }

  deleteTrackFromFavs(id: string) {
    db.favs.tracks = db.favs.tracks.filter((trackId) => trackId !== id);
  }

  deleteAlbumFromFavs(id: string) {
    db.favs.albums = db.favs.albums.filter((albumId) => albumId !== id);
  }

  deleteArtistFromFavs(id: string) {
    db.favs.artists = db.favs.artists.filter((artistId) => artistId !== id);
  }
}
