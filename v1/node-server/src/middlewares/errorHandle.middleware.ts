import type { ErrorRequestHandler, RequestHandler } from 'express';
import BaseException from '../exceptions/base.exception';
import logger from '../services/logger.service';

export const errorHandlers: ErrorRequestHandler = (
	error: any,
	req,
	res,
	__
) => {
    let customError: BaseException = error;

    // Convert to BaseException if error is not instance of BaseException and Error
    if (!(error instanceof BaseException) && !(error instanceof Error)) {
        customError = new BaseException(error.name, error.message, 500);
    }

	// Convert to BaseException if error is instance of node Error
	if (error instanceof Error) {
		customError = new BaseException(error.name, error.message, 500);
	}

	// Add metadata to error
    customError.setPath(req.path);

	// Show error in console
	logger.error(customError.toString());

	// Send error response
	res.status(customError.status).json(customError.getError());
};

export const catchError = (fn: RequestHandler): RequestHandler => {
    return ((req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	}) ;
};
