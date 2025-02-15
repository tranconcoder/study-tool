import mongoose from 'mongoose';
import chalk from 'chalk';
import { MONGO_URI } from '../configs/env.config';

class MongooseDB {
	private static instance: MongooseDB;

	private connection: mongoose.Connection;
	private uri: string = MONGO_URI;

	private constructor() {
		this.connection = mongoose.connection;

		this.connection.on('connected', () => {
			console.log(`MongooseDB: ${chalk.green.bold('Connected')} to MongoDB`);
		});

		this.connection.on('disconnected', () => {
			console.log(`MongooseDB: ${chalk.red.bold('Disconnected')} from MongoDB`);
		});

		this.connection.on('error', (error) => {
			console.log(
				`${chalk.red.bold('MongooseDB: Error')}: ${chalk.red.bold(error)}`
			);
		});
	}

	public static getInstance(): MongooseDB {
		if (!MongooseDB.instance) {
			MongooseDB.instance = new MongooseDB();
		}

		return MongooseDB.instance;
	}

	public async connect(): Promise<void> {
		try {
			console.log('MongooseDB: Connecting to MongoDB');

			await mongoose.connect(this.uri);
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

const db = MongooseDB.getInstance();

export default db;
