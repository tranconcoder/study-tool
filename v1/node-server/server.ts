// Express
import app from './src/index';

// Services
import logger from './src/services/logger.service';

// Configs
import { NODE_ENV, SERVER_HOST, SERVER_PORT } from './src/configs/env.config';

const server = app.listen(SERVER_PORT, SERVER_HOST, () => {
	console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`);
});

// Show server running message only in production
if (NODE_ENV === 'production') {
	server.on('listening', () => {
		logger.info(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`);
	});

	server.on('error', (error) => {
		logger.error(error.message);
	});

	server.on('close', () => {
		logger.info('Server closed');
	});
}

process.on('SIGINT', () => {
	console.log('Server closing...');
	server.close();
});
