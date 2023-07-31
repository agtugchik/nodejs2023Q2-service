import { Controller, Get, Param, Post, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { IFavoritesEntities } from 'src/types/favouritesType';

@Controller()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get('favs')
  getTracks(): IFavoritesEntities {
    return this.favoritesService.getFavorites();
  }

  @Post('favs/track/:id')
  addTrackToFavs(@Param('id') id: string) {
    this.favoritesService.addTrackToFavs(id);
  }

  @Post('favs/album/:id')
  addAlbumToFavs(@Param('id') id: string) {
    this.favoritesService.addAlbumToFavs(id);
  }

  @Post('favs/artist/:id')
  addArtistToFavs(@Param('id') id: string) {
    this.favoritesService.addArtistToFavs(id);
  }

  @Delete('favs/track/:id')
  @HttpCode(204)
  deleteTrackFromFavs(@Param('id') id: string) {
    this.favoritesService.deleteTrackFromFavs(id);
  }

  @Delete('favs/album/:id')
  @HttpCode(204)
  deleteAlbumFromFavs(@Param('id') id: string) {
    this.favoritesService.deleteAlbumFromFavs(id);
  }

  @Delete('favs/artist/:id')
  @HttpCode(204)
  deleteArtistFromFavs(@Param('id') id: string) {
    this.favoritesService.deleteArtistFromFavs(id);
  }
}
