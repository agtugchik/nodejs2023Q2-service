import { Module } from '@nestjs/common';
import { TracksController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [TracksController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
