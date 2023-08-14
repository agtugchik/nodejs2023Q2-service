import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';

config();

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  entities: ['dist/**/entities/*.entity.js'],
} as DataSourceOptions;
