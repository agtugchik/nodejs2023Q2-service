import IArtist from './artistType';
import ITrack from './trackType';
import IUser from './userTypes';

interface IDb {
  users: Array<IUser>;
  tracks: Array<ITrack>;
  artists: Array<IArtist>;
}

export default IDb;
