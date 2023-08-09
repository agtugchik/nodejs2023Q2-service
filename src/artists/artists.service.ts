import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateArtistDto from 'src/dto/createArtist.dto';
import validateUUID from 'src/helpers/validateUUID';
import { Repository } from 'typeorm';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async getArtists() {
    return await this.artistRepository.find();
  }

  async getArtist(artistId: string) {
    if (!validateUUID(artistId)) {
      throw new BadRequestException('Invalid artist id');
    }

    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async createArtist(dto: CreateArtistDto) {
    const createArtist = this.artistRepository.create({ ...dto });

    return await this.artistRepository.save(createArtist);
  }

  async deleteArtist(artistId: string) {
    if (!validateUUID(artistId)) {
      throw new BadRequestException('Invalid artist id');
    }

    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    await this.artistRepository.delete(artistId);
  }

  async updateArtist(dto: CreateArtistDto, artistId: string) {
    if (!validateUUID(artistId)) {
      throw new BadRequestException('Invalid artist id');
    }

    const artist = await this.artistRepository.findOne({
      where: { id: artistId },
    });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return await this.artistRepository.save({ ...dto, id: artist.id });
  }
}
