import express from 'express';
import { HOST, PORT } from './configs/env.config';

const app = express();

app.get('/', (req, res) => {
	res.send('Hello World');
});

export default app;
