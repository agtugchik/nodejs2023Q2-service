import IDb from 'src/types/dbType';

const db: IDb = {
  users: [
    {
      id: '78b9f4cf-1d08-47b8-948f-f2a04681531d',
      login: 'test',
      password: 'test',
      version: 1,
      createdAt: 1,
      updatedAt: 1,
    },
  ],
  tracks: [
    {
      id: '1fd7cea0-5950-4f07-9145-6cff09b5f433',
      name: '1',
      artistId: null,
      albumId: null,
      duration: 1,
    },
  ],
};

export default db;
