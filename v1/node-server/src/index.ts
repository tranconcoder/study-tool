import express from "express";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import rootRoute from "./routes";

const app = express();

// Setup middlewares
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());

// Handle routers
app.use("/", rootRoute);

// Connect to database

export default app;
