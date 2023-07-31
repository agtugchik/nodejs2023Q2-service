import { Module } from '@nestjs/common';
import { TracksController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  imports: [],
  controllers: [TracksController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
