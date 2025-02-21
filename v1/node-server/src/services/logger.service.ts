import * as winston from 'winston';
import 'winston-daily-rotate-file';

const consoleTransport = new winston.transports.Console({
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.printf((info) => `[${info.level}]: ${info.message}`)
	),
});

const fileTransport = new winston.transports.DailyRotateFile({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json(),
		winston.format.printf(
			(info) => `[${info.timestamp}] [${info.level}]: ${info.message}`
		)
	),
	zippedArchive: true,
	filename: '%DATE%.log',
	dirname: 'logs',
	datePattern: 'yyyy/[weeks]-ww/[day]-d',
	maxFiles: '30d',
	maxSize: '50m',
});

const logger = winston.createLogger({
	transports: [fileTransport],
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(consoleTransport);
}

export default logger;
