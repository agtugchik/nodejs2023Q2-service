import { DataSource, DataSourceOptions } from 'typeorm';
import options from './ormconfig';

const newOptions = {
  ...options,
  host: 'localhost',
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['src/migration/*.js'],
  logging: false,
} as DataSourceOptions;

const dataSource = new DataSource(newOptions).initialize();

export default dataSource;
