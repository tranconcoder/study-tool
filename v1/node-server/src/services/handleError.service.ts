import { Request, Response, NextFunction, RequestHandler } from 'express';
import BaseException from '../responses/error.response';
import logger from './logger.service';
import { v4 as uuid } from 'uuid';

export default class HandleErrorService {
	public static handler(
		error: any,
		req: Request,
		res: Response,
		next: NextFunction
	) {
		let customError: BaseException = error;
		const NODE_ENV = process.env.NODE_ENV || 'development';

		// Convert to BaseException if error is not instance of BaseException and Error
		if (!(error instanceof BaseException) && !(error instanceof Error)) {
			customError = new BaseException(error.name, error.message, 500);
		}

		// Convert to BaseException if error is instance of node Error
		if (error instanceof Error) {
			customError = new BaseException(error.name, error.message, 500);
		}

		// Add metadata to error
		error.setPath(req.path);

		// Strategy to handle error
		const handlers = {
			development: HandleErrorService.development,
			production: HandleErrorService.production,
		};
		handlers[NODE_ENV](customError, req, res, next);
	}

	public static development(
		error: BaseException,
		req: Request,
		res: Response,
		next: NextFunction
	) {
		// Show error in console
		logger.error(error.toString());

		// Send error response
		res.status(error.status).json(error.getError());
	}

	public static production(
		error: BaseException,
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const loggerId = uuid();

		// Log Error
		logger.error(error.toString(), { id: loggerId });

		return res.status(error.status).json({
            status: "error",
			id: loggerId,
		});
	}

	public static catchError(fn: RequestHandler): RequestHandler {
		return async (req, res, next) => {
			try {
				await Promise.resolve(fn(req, res, next));
			} catch (error) {
				next(error);
			}
		};
	}
}
