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
import { AlbumsService } from './albums.service';
import IAlbum from 'src/types/albumetype';
import CreateAlbumDto from 'src/dto/createAlbum.dto';

@Controller()
export class TracksController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get('album')
  getAlbums(): Array<ITrack> {
    return this.albumsService.getAlbums();
  }

  @Get('album/:id')
  getAlbum(@Param('id') id: string): IAlbum {
    return this.albumsService.getAlbum(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('album')
  createAlbum(@Body() dto: CreateAlbumDto) {
    return this.albumsService.createAlbum(dto);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    this.albumsService.deleteAlbum(id);
  }

  @UsePipes(new ValidationPipe())
  @Put('album/:id')
  updateTrack(@Body() dto: CreateAlbumDto, @Param('id') id: string) {
    return this.albumsService.updateAlbum(dto, id);
  }
}
