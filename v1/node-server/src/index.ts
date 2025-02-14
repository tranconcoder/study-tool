// Express
import express from 'express';

// Library
import compress from 'compression';
import helmet from 'helmet';

// Routes
import apiRouter from './routes';

const app = express();

// Express middleware
app.use(express.raw());
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Library
app.use(compress());
app.use(helmet());

// Routes
app.use('/v1/api', apiRouter);

export default app;
