// Express
import express from "express";

// Library
import compress from "compression";
import helmet from "helmet";
import morgan from "morgan";

// Routes
import apiRouter from "./routes";

// Middleware
import { errorHandlers } from "./middlewares/errorHandle.middleware";

// Database
import db from "./app/db.app";
import NotFoundException from "./exceptions/not-found.exception";
import {ErrorLevel} from "./exceptions/base.exception";

const app = express();

// Express middleware
app.use(express.json());
app.use(express.raw());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Lib middleware
app.use(compress());
app.use(helmet());
app.use(morgan("dev"));

// Connect database
db.connect();

// Routes
app.use("/v1/api", apiRouter);

// 404 handler
app.use((_, __, next) => {
    next(new NotFoundException("Page not found", ErrorLevel.LOW));
});

// Error handling
app.use(errorHandlers);

export default app;
