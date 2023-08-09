import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateAlbumDto from 'src/dto/createAlbum.dto';
import validateUUID from 'src/helpers/validateUUID';
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
    if (!validateUUID(albumId)) {
      throw new BadRequestException('Invalid album id');
    }

    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async createAlbum(dto: CreateAlbumDto) {
    const createAlbum = this.albumRepository.create({ ...dto });

    return await this.albumRepository.save(createAlbum);
  }

  async deleteAlbum(albumId: string) {
    if (!validateUUID(albumId)) {
      throw new BadRequestException('Invalid album id');
    }

    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    await this.albumRepository.delete(albumId);
  }

  async updateAlbum(dto: CreateAlbumDto, albumId: string) {
    if (!validateUUID(albumId)) {
      throw new BadRequestException('Invalid album id');
    }

    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return await this.albumRepository.save({ ...dto, id: album.id });
  }
}
