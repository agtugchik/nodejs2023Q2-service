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
  artists: [
    { id: 'a234d5b6-5c17-4db4-8e91-9080c14cf7e5', name: 'name', grammy: true },
  ],
  albums: [
    {
      id: 'a1360049-9e74-487e-8034-6e89bd7636e2',
      name: 'name',
      year: 1,
      artistId: null,
    },
  ],
  favs: {
    artists: [],
    albums: [],
    tracks: [],
  },
};

export default db;
