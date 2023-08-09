import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import CreateArtistDto from 'src/dto/createArtist.dto';

@Controller()
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get('artist')
  async getArtists() {
    return await this.artistsService.getArtists();
  }

  @Get('artist/:id')
  async getArtist(@Param('id') id: string) {
    return await this.artistsService.getArtist(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('artist')
  async createArtist(@Body() dto: CreateArtistDto) {
    return await this.artistsService.createArtist(dto);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string) {
    await this.artistsService.deleteArtist(id);
  }

  @UsePipes(new ValidationPipe())
  @Put('artist/:id')
  async updateArtist(@Body() dto: CreateArtistDto, @Param('id') id: string) {
    return await this.artistsService.updateArtist(dto, id);
  }
}
