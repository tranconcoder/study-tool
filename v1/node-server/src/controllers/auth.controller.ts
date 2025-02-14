import { Request, Response, NextFunction } from 'express';
import NotFoundException from '../exceptions/not-found.exception';

export default class AuthController {
	public static async login(req: Request, res: Response, next: NextFunction) {
		throw new NotFoundException('User not found');
	}
}
