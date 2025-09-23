import express from 'express';
import session from 'express-session';
import { pool } from './config/db';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
    
})); // Para la conexion del front
app.use(morgan('dev')); // Pars los logs HTTP
app.use(express.json());

app.get 