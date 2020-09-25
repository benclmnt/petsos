import { Pool } from 'pg';
import config from '../config/db';

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

pool.on('error', () => {
  console.error.bind(console, 'Postgres connection error: ');
});

export default pool;
