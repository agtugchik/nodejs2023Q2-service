import { Controller, Get } from '@nestjs/common';
import ITrack from 'src/types/trackType';
import { TracksService } from './artists.service';

@Controller()
export class TracksController {
  constructor(private readonly appService: TracksService) {}

  @Get('track')
  getTracks(): Array<ITrack> {
    return this.appService.getTracks();
  }
}
