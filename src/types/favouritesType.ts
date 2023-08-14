import IAlbum from './albumeType';
import IArtist from './artistType';
import ITrack from './trackType';

export interface IFavorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface IFavoritesEntities {
  artists: Array<IArtist>;
  albums: Array<IAlbum>;
  tracks: Array<ITrack>;
}

export default IFavorites;
