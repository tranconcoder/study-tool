import { ErrorRequestHandler } from 'express';
import BaseException from './base.exception';
import logger from '../services/logger.service';

const errorHandlers: ErrorRequestHandler = (
	error: Error | BaseException,
	req,
	res,
	__
) => {
	let customError = error as BaseException;

	// Convert to BaseException if error is instance of node Error
	if (!(error instanceof BaseException)) {
		customError = new BaseException(error.name, error.message, 500);
	}

	// Add metadata to error
	customError.setPath(req.path);

	// Show error in console
	logger.error(customError.toString());

	// Send error response
	res.status(customError.status).json(customError.getError());
};

export const catchError = (fn: Function) => {
	return (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
};

export default errorHandlers;
