import { Router } from 'express';
import authRoute from './auth';

const apiRouter = Router();

apiRouter.use('/auth', authRoute);

export default apiRouter;
