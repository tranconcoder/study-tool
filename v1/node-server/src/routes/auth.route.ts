import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { catchError } from '../middlewares/errorHandle.middleware';

const authRoute = Router();

authRoute.post('/login', catchError(AuthController.login));

export default authRoute;
