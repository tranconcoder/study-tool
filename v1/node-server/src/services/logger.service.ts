import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { getDirnameByYearWeekDay } from '../utils/logger.util';
import fs from 'fs';

const consoleTransport = new winston.transports.Console({
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.timestamp(),
		winston.format.align(),
		winston.format.printf((info) => `${info.level}: ${info.message}`)
	),
});

const fileTransport = new winston.transports.DailyRotateFile({
	level: 'info',
	zippedArchive: true,
	filename: 'logs/%DATE%.log',
	datePattern: 'yyyy/[weeks]-ww/[day]-d',
});

const logger = winston.createLogger({
	format: winston.format.json(),
	defaultMeta: { service: 'user-service' },
	transports: [fileTransport],
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(consoleTransport);
}

export default logger;
