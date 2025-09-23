import { createPool } from 'mysql2/promise';
import dotenv from 'doteenv';

dotenv.config();

export const pool = createPool({
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    PORT: process.env.DB_PORT,
    DATABASE: process.env.DB_NAME
});