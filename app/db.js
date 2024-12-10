import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER
  });

  export {
    pool
}