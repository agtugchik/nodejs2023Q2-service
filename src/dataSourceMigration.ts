import { DataSource, DataSourceOptions } from 'typeorm';

const options = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['src/**/entities/*.entity{.js,.ts}'],
  migrations: ['src/migration/*{.js,.ts}'],
} as DataSourceOptions;

const dataSource = new DataSource(options);

export default dataSource;
