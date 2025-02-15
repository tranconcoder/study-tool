import dotenv from 'dotenv';
import path from 'path';

// Load env variables
export const NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config({
	path: path.join(__dirname, `../../.env.${NODE_ENV}`),
});

// Server configs
export const SERVER_PORT = Number(process.env.SERVER_PORT) || 3000;
export const SERVER_HOST = process.env.SERVER_HOST || 'localhost';

// Database configs
export const MONGO_URI =
	process.env.MONGO_URI || 'mongodb://localhost:27017/test';
