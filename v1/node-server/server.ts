import { HOST, PORT } from './src/configs/env.config';
import app from './src';

const server = app.listen(PORT, HOST, () => {
	console.log(`Server is running on http://${HOST}:${PORT}`);
});

process.on('SIGINT', async () => {
	console.log('STOPPING: Server is stopping...');

	// Stopping express server
	await new Promise((resolve) => {
		server.close(() => {
			console.log('STOPPED: Server stopped by user!');
			resolve(null);
		});
	});

	process.exit();
});
