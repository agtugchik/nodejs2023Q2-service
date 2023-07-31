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
import ITrack from 'src/types/trackType';
import { TracksService } from './tracks.service';
import CreateTrackDto from 'src/dto/createTrack.dto';

@Controller()
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get('track')
  getTracks(): Array<ITrack> {
    return this.tracksService.getTracks();
  }

  @Get('track/:id')
  getTrack(@Param('id') id: string): ITrack {
    return this.tracksService.getTrack(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('track')
  createTrack(@Body() dto: CreateTrackDto) {
    return this.tracksService.createTrack(dto);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    this.tracksService.deleteTrack(id);
  }

  @UsePipes(new ValidationPipe())
  @Put('track/:id')
  updateTrack(@Body() dto: CreateTrackDto, @Param('id') id: string) {
    return this.tracksService.updateTrack(dto, id);
  }
}
