// Express
import express from "express";

// Library
import compress from "compression";
import helmet from "helmet";
import morgan from "morgan";

// Response
import { ErrorLevel, NotFoundException } from "./responses/error.response"

// Routes
import apiRouter from "./routes";

// Middleware
import { errorHandlers } from "./middlewares/errorHandle.middleware";

// Database
import db from "./app/db.app";

const app = express();

// Express middleware
app.use(express.json());
app.use(express.raw());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(compress());
app.use(helmet());
app.use(morgan("dev"));

// Connect database
db.connect();

// Routes
app.use("/v1/api", apiRouter);

// 404 Handler
app.use((_, __, next) => {
    next(new NotFoundException("Page not found", ErrorLevel.LOW));
});

// Error handling
app.use(errorHandlers);

export default app;
