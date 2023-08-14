import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
  Post,
  Body,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import CreateTrackDto from 'src/dto/createTrack.dto';

@Controller()
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get('track')
  async getTracks() {
    return await this.tracksService.getTracks();
  }

  @Get('track/:id')
  async getTrack(@Param('id') id: string) {
    return await this.tracksService.getTrack(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('track')
  async createTrack(@Body() dto: CreateTrackDto) {
    return await this.tracksService.createTrack(dto);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    await this.tracksService.deleteTrack(id);
  }

  @UsePipes(new ValidationPipe())
  @Put('track/:id')
  async updateTrack(@Body() dto: CreateTrackDto, @Param('id') id: string) {
    return await this.tracksService.updateTrack(dto, id);
  }
}
