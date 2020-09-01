import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const databaseConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: 5432,
  database: process.env.PG_DB,
};

const pool = new Pool(databaseConfig);

export default pool;
