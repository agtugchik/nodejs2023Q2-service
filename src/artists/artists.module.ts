import { Module } from '@nestjs/common';
import { TracksController } from './artists.controller';
import { TracksService } from './artists.service';

@Module({
  imports: [],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
