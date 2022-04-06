import { Router } from 'express';
import projectRouter from './projects';
import taskRouter from './tasks';
import timerRouter from './timers';
import userRouter from './users';

const router = Router();

router.use('/users', userRouter);
router.use('/projects', projectRouter);
router.use('/tasks', taskRouter);
router.use('/timers', timerRouter);

export default router;
