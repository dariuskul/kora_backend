import { Router } from 'express';
import projectRouter from './projects';
import taskRouter from './tasks';
import timerRouter from './timers';
import userRouter from './users';
import reportRouter from './reports';

const router = Router();

router.use('/users', userRouter);
router.use('/projects', projectRouter);
router.use('/tasks', taskRouter);
router.use('/timers', timerRouter);
router.use('/reports', reportRouter)

export default router;
