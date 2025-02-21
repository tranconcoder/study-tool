// Type
import { Request, Response, NextFunction } from 'express';

// Validate
import Joi from 'joi';
import { loginSchema } from '../configs/joi.config';

// Handle exception
import NotFoundException from '../exceptions/not-found.exception';
import { ErrorLevel } from '../exceptions/base.exception';

// Service
import AuthService from '../services/auth.service';

export default class AuthController {
	public static async login(req: Request, res: Response, next: NextFunction) {
		try {
			// Validate request body
			const value = await loginSchema.validateAsync(req.body);

			// Handle login
            (await AuthService.login(value.username, value.password)).send(res);
		} catch (error) {
			if (error instanceof Joi.ValidationError) {
				throw new NotFoundException(
					'Not found username or password',
					ErrorLevel.HIGH
				);
			}

			throw error;
		}
	}
}
