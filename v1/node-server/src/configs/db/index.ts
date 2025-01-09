import mongoose from "mongoose";
import { MONGODB_URI } from "../env.config";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);

        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};

export default connectMongoDB;
