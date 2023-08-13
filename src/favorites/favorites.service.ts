import {
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
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
    return favs;
  }

  private async getFavs() {
    return (
      await this.favoriteRepository.find({
        relations: { tracks: true, albums: true, artists: true },
      })
    )[0];
  }

  async addTrackToFavs(id: string) {
    if (!validateUUID(id)) throw new BadRequestException('');
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new UnprocessableEntityException('');
    const favs = await this.getFavs();
    favs.tracks.push(track);
    await this.favoriteRepository.save(favs);
  }
  async addAlbumToFavs(id: string) {
    if (!validateUUID(id)) throw new BadRequestException('');
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new UnprocessableEntityException('');
    const favs = await this.getFavs();
    favs.albums.push(album);
    await this.favoriteRepository.save(favs);
  }

  async addArtistToFavs(id: string) {
    if (!validateUUID(id)) throw new BadRequestException('');
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new UnprocessableEntityException('');
    const favs = await this.getFavs();
    favs.artists.push(artist);
    await this.favoriteRepository.save(favs);
  }

  async deleteTrackFromFavs(id: string) {
    if (!validateUUID(id)) throw new BadRequestException('');
    const favs = await this.getFavs();
    const track = favs.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException('');
    favs.tracks = favs.tracks.filter((track) => track.id !== id);
    await this.favoriteRepository.save(favs);
  }

  async deleteAlbumFromFavs(id: string) {
    if (!validateUUID(id)) throw new BadRequestException('');
    const favs = await this.getFavs();
    const album = favs.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException('');
    favs.albums = favs.albums.filter((album) => album.id !== id);
    await this.favoriteRepository.save(favs);
  }

  async deleteArtistFromFavs(id: string) {
    if (!validateUUID(id)) throw new BadRequestException('');
    const favs = await this.getFavs();
    const artist = favs.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException('');
    favs.artists = favs.artists.filter((album) => album.id !== id);
    await this.favoriteRepository.save(favs);
  }
}
