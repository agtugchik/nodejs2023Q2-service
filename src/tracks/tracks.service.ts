import { Injectable } from '@nestjs/common';
import CreateTrackDto from '../dto/createTrack.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { Repository } from 'typeorm';
import errorResponses from '../helpers/clientErrorResponses';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getTracks() {
    return await this.trackRepository.find();
  }

  async getTrack(trackId: string) {
    const track = await errorResponses(trackId, 'track', this.trackRepository);
    return track;
  }

  async createTrack(dto: CreateTrackDto) {
    const createTrack = this.trackRepository.create({ ...dto });
    return await this.trackRepository.save(createTrack);
  }

  async deleteTrack(trackId: string) {
    await errorResponses(trackId, 'track', this.trackRepository);
    await this.trackRepository.delete(trackId);
  }

  async updateTrack(dto: CreateTrackDto, trackId: string) {
    const track = await errorResponses(trackId, 'track', this.trackRepository);
    return await this.trackRepository.save({ ...dto, id: track.id });
  }
}
