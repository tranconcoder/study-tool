import { Router } from 'express';
// Controllers
import AuthController from '../../controllers/auth.controller';
// Middleware
import { catchError } from '../../middlewares/errorHandle.middleware';

const authRoute = Router();

authRoute.post('/login', catchError(AuthController.login));

export default authRoute;
