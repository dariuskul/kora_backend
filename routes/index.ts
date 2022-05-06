import { Router } from 'express';
import projectRouter from './projects';
import taskRouter from './tasks';
import timerRouter from './timers';
import userRouter from './users';
import reportRouter from './reports';
import clientRouter from './client';

const router = Router();

router.use('/users', userRouter);
router.use('/projects', projectRouter);
router.use('/tasks', taskRouter);
router.use('/timers', timerRouter);
router.use('/reports', reportRouter)
router.use('/clients', clientRouter)

export default router;
