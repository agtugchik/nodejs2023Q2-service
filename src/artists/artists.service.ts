import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateArtistDto from 'src/dto/createArtist.dto';
import errorResponses from 'src/helpers/clientErrorResponses';
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
    const artist = await errorResponses(
      artistId,
      'artist',
      this.artistRepository,
    );
    return artist;
  }

  async createArtist(dto: CreateArtistDto) {
    const createArtist = this.artistRepository.create({ ...dto });
    return await this.artistRepository.save(createArtist);
  }

  async deleteArtist(artistId: string) {
    await errorResponses(artistId, 'artist', this.artistRepository);
    await this.artistRepository.delete(artistId);
  }

  async updateArtist(dto: CreateArtistDto, artistId: string) {
    const artist = await errorResponses(
      artistId,
      'artist',
      this.artistRepository,
    );
    return await this.artistRepository.save({ ...dto, id: artist.id });
  }
}
