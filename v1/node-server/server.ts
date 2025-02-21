import "./src/helpers/loadEnv.helper";

// Express
import app from './src/index';

// Services
import logger from './src/services/logger.service';

// Configs
import { SERVER_HOST, SERVER_PORT } from './src/configs/server.config';



const server = app.listen(SERVER_PORT, SERVER_HOST, () => {
	console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`);
});

// Show server running message only in production
if (process.env.NODE_ENV === 'production') {
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
    if (process.env.NODE_ENV === "production") {
        logger.info("Server is shutting down...");
    }

    server.close(() => {
	   console.log('Server closing...');
    });
});

