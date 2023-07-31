import IUser, { IUserWithoutPassword } from 'src/types/userTypes';

const getUserWithoutPass = (user: IUser): IUserWithoutPassword => ({
  id: user.id,
  login: user.login,
  version: user.version,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export default getUserWithoutPass;
