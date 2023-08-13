import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import validateUUID from 'src/helpers/validateUUID';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { Repository } from 'typeorm';
import { FavoriteEntity } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoriteRepository: Repository<FavoriteEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async getFavorites() {
    let favs = await this.getFavs();
    if (!favs) {
      await this.favoriteRepository.save({});
      favs = await this.getFavs();
    }
    // console.log((await this.favoriteRepository.find()).length);

    return favs;
  }

  private async getFavs() {
    return (
      await this.favoriteRepository.find({
        // where: {},
        relations: { tracks: true, albums: true, artists: true },
      })
    )[0];
  }

  async addTrackToFavs(id: string) {
    if (!validateUUID(id)) throw new HttpException('', HttpStatus.BAD_REQUEST);
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new HttpException('', HttpStatus.UNPROCESSABLE_ENTITY);
    const favs = await this.getFavs();
    favs.tracks.push(track);
    console.log('BEFORE ADD TRACK', favs.tracks.length);
    await this.favoriteRepository.save(favs);
    console.log('AFTER ADD TRACK', (await this.getFavs()).tracks.length);
  }

  async deleteTrackFromFavs(id: string) {
    if (!validateUUID(id)) throw new HttpException('', HttpStatus.BAD_REQUEST);
    const favs = await this.getFavs();
    // console.log('favs', favs);
    const track = favs.tracks.find((track) => track.id == id);

    // console.log('TRACKID', id);
    // console.log('TRACK', track);
    if (!track) throw new HttpException('', HttpStatus.NOT_FOUND);
    favs.tracks = favs.tracks.filter((track) => track.id !== id);
    await this.favoriteRepository.save(favs);
  }
}
