import ITrack from './trackType';
import IUser from './usersTypes';

interface IDb {
  users: Array<IUser>;
  tracks: Array<ITrack>;
}

export default IDb;
