import { Router } from 'express';
// Controllers
import AuthController from '../../controllers/auth.controller';
// Middleware
import HandleErrorService from '../../services/handleError.service';

const authRoute = Router();

authRoute.post('/login', HandleErrorService.catchError(AuthController.login));

export default authRoute;
