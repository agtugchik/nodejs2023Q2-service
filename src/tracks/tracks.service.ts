import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import CreateTrackDto from 'src/dto/createTrack.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { Repository } from 'typeorm';
import validateUUID from 'src/helpers/validateUUID';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getTracks() {
    const tracks = await this.trackRepository.find();

    return tracks.map((track) => track);
  }

  async getTrack(trackId: string) {
    if (!validateUUID(trackId)) {
      throw new BadRequestException('Invalid track id');
    }

    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async createTrack(dto: CreateTrackDto) {
    const createTrack = this.trackRepository.create({ ...dto });

    return await this.trackRepository.save(createTrack);
  }

  async deleteTrack(trackId: string) {
    if (!validateUUID(trackId)) {
      throw new BadRequestException('Invalid track id');
    }

    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    if (!track) {
      throw new NotFoundException('Track not found');
    }
    await this.trackRepository.delete(trackId);
  }

  async updateTrack(dto: CreateTrackDto, trackId: string) {
    if (!validateUUID(trackId)) {
      throw new BadRequestException('Invalid track id');
    }

    const track = await this.trackRepository.findOne({
      where: { id: trackId },
    });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return await this.trackRepository.save({ ...dto, id: track.id });
  }
}
