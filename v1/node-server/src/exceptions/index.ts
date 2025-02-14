import { ErrorRequestHandler } from 'express';
import BaseException from './base.exception';
import chalk from 'chalk';

const errorHandlers: ErrorRequestHandler = (
	error: Error | BaseException,
	req,
	res,
	next
) => {
	let customError = error as BaseException;

	// Convert to BaseException if error is instance of node Error
	if (!(error instanceof BaseException)) {
		customError = new BaseException(error.name, error.message, 500);
	}

	// Add metadata to error
	customError.setPath(req.path);

	// Show error in console
	console.log(chalk.red(customError.toString()));

	// Send error response
	res.status((error as BaseException).status).json(error);
};

export default errorHandlers;
