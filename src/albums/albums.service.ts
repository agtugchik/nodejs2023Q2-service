import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateAlbumDto from '../dto/createAlbum.dto';
import errorResponses from '../helpers/clientErrorResponses';
import { Repository } from 'typeorm';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAlbums() {
    return await this.albumRepository.find();
  }

  async getAlbum(albumId: string) {
    const album = await errorResponses(albumId, 'album', this.albumRepository);
    return album;
  }

  async createAlbum(dto: CreateAlbumDto) {
    const createAlbum = this.albumRepository.create({ ...dto });

    return await this.albumRepository.save(createAlbum);
  }

  async deleteAlbum(albumId: string) {
    await errorResponses(albumId, 'album', this.albumRepository);
    await this.albumRepository.delete(albumId);
  }

  async updateAlbum(dto: CreateAlbumDto, albumId: string) {
    const album = await errorResponses(albumId, 'album', this.albumRepository);
    return await this.albumRepository.save({ ...dto, id: album.id });
  }
}
