import app from './src/index';
import { SERVER_HOST, SERVER_PORT } from './src/configs/env.config';

const server = app.listen(SERVER_PORT, SERVER_HOST, () => {
	console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`);
});

process.on('SIGINT', () => {
	console.log('Server closing...');
	server.close();
});
