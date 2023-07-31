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
import IArtist from 'src/types/artistType';
import CreateArtistDto from 'src/dto/createArtist.dto';

@Controller()
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get('artist')
  getArtists(): Array<IArtist> {
    return this.artistsService.getArtists();
  }

  @Get('artist/:id')
  getArtist(@Param('id') id: string): IArtist {
    return this.artistsService.getArtist(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('artist')
  create(@Body() dto: CreateArtistDto) {
    return this.artistsService.createArtist(dto);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    this.artistsService.deleteArtist(id);
  }

  @UsePipes(new ValidationPipe())
  @Put('artist/:id')
  updateArtist(@Body() dto: CreateArtistDto, @Param('id') id: string) {
    return this.artistsService.updateArtist(dto, id);
  }
}
