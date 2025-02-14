import express from 'express';
import compress from 'compression';
import helmet from 'helmet';

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

export default app;
