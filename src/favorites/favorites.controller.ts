import { Controller, Get, Param, Post, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getTracks() {
    return await this.favoritesService.getFavorites();
  }

  @Post('/track/:id')
  async addTrackToFavs(@Param('id') id: string) {
    await this.favoritesService.addTrackToFavs(id);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async deleteTrackFromFavs(@Param('id') id: string) {
    await this.favoritesService.deleteTrackFromFavs(id);
  }

  @Post('/album/:id')
  async addAlbumToFavs(@Param('id') id: string) {
    await this.favoritesService.addAlbumToFavs(id);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async deleteAlbumFromFavs(@Param('id') id: string) {
    await this.favoritesService.deleteAlbumFromFavs(id);
  }

  @Post('/artist/:id')
  async addArtistToFavs(@Param('id') id: string) {
    await this.favoritesService.addArtistToFavs(id);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async deleteArtistFromFavs(@Param('id') id: string) {
    await this.favoritesService.deleteArtistFromFavs(id);
  }
}
