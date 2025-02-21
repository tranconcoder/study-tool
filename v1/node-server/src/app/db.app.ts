import mongoose, { MongooseError } from "mongoose";
import { MONGO_URI, MONGO_MIN_POOL_SIZE, MONGO_MAX_POOL_SIZE } from "../configs/db.config";
import logger from "../services/logger.service";

// Singleton pattern
class MongooseDB {
    private static instance: MongooseDB;
    private connectionString: string;

    private constructor() {
        this.connectionString = MONGO_URI;

        mongoose.connection.on("connected", () => {
            console.log("Mongoose connected");
        });

        mongoose.connection.on("error", (error: MongooseError) => {
            logger.error(`${error.name}::::::::${error.message}`);
        });

        mongoose.connection.on("disconnected", () => {
            console.log("Mongoose disconnected!")
        })
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new MongooseDB();
        }


        return this.instance;
    }

    public connect() {
        mongoose.connect(this.connectionString, {
            minPoolSize: MONGO_MIN_POOL_SIZE,
            maxPoolSize: MONGO_MAX_POOL_SIZE,
        });
    }
}

const db = MongooseDB.getInstance();

export default db;
