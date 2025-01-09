import express from "express";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import rootRoute from "./routes";
import connectMongoDB from "./configs/db";

const app = express();

// Clear console
process.stdout.write("\x1Bc");

// Connect to database
connectMongoDB();

// Setup middlewares
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());

// Handle routers
app.use("/", rootRoute);

// Connect to database

export default app;
