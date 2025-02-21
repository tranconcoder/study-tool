console.log(__filename);
import dotenv from 'dotenv';
import path from 'path';

const NODE_ENV = process.env.NODE_ENV || 'development';
const envFilePath = path.join(__dirname, `../../.env.${NODE_ENV}.local`);

dotenv.config({ path: envFilePath });
