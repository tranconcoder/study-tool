import dotenv from 'dotenv';
import path from 'path';

// Load env variables
const NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config({
	path: path.join(__dirname, `../../.env.${NODE_ENV}`),
});

// Server configs
export const SERVER_PORT = process.env.SERVER_PORT || 3000;
export const SERVER_HOST = process.env.SERVER_HOST || 'localhost';

// Database configs
