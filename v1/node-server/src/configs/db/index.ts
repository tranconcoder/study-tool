import mongoose from "mongoose";
import { MONGODB_URI } from "../env.config";

const connectMongoDB = async () => {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
};

export default connectMongoDB;
