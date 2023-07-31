export interface IUserWithoutPassword {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface IUser extends IUserWithoutPassword {
  password: string;
}

export default IUser;
