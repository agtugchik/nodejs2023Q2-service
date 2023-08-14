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
import { AlbumsService } from './albums.service';
import CreateAlbumDto from 'src/dto/createAlbum.dto';

@Controller()
export class TracksController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get('album')
  async getAlbums() {
    return await this.albumsService.getAlbums();
  }

  @Get('album/:id')
  async getAlbum(@Param('id') id: string) {
    return await this.albumsService.getAlbum(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('album')
  async createAlbum(@Body() dto: CreateAlbumDto) {
    return await this.albumsService.createAlbum(dto);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    await this.albumsService.deleteAlbum(id);
  }

  @UsePipes(new ValidationPipe())
  @Put('album/:id')
  async updateTrack(@Body() dto: CreateAlbumDto, @Param('id') id: string) {
    return await this.albumsService.updateAlbum(dto, id);
  }
}
