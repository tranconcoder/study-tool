import mongoose from 'mongoose';
import { MONGO_URI } from '../configs/env.config';

export default class MongooseDB {
	private static instance: MongooseDB;
	private connection: mongoose.Connection;
	private uri: string = MONGO_URI;

	private constructor() {
		this.connection = mongoose.connection;
	}

	public static getInstance(): MongooseDB {
		if (!MongooseDB.instance) {
			MongooseDB.instance = new MongooseDB();
		}

		return MongooseDB.instance;
	}

	public async connect(): Promise<void> {
		try {
			await mongoose.connect(uri);
		} catch (error) {
			throw new Error(`MongooseDB: ${error}`);
		}
	}

	public async disconnect(): Promise<void> {
		try {
			await this.connection.close();
		} catch (error) {
			throw new Error(`MongooseDB: ${error}`);
		}
	}
}
