import { Request, Response, Router } from 'express';
import { EStatus } from '../constants/status';
import * as timerController from '../controllers/timer.controller';
import { authorize } from '../middlewares/authorize';
import { HttpError } from '../types/error';

const timerRouter = Router();

timerRouter.post('/start', authorize(), async (req: Request, res: Response) => {
  const taskId: number = req.body.taskId;
  const userId: string = (req.user as any).sub;
  try {
    const timer = await timerController.start(taskId, Number(userId));
    return res.status(200).send(timer);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

timerRouter.post('/stop', authorize(), async (req: Request, res: Response) => {
  const userId: string = (req.user as any).sub;
  try {
    const timer = await timerController.stop(Number(userId));
    return res.status(200).send(timer);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

timerRouter.get('/', authorize(), async (req: Request, res: Response) => {
  const userId: string = (req.user as any).sub;
  try {
    const timer = await timerController.getUserEntries(Number(userId));
    return res.status(200).send(timer);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
})

timerRouter.get('/current', authorize(), async (req: Request, res: Response) => {
  const userId: string = (req.user as any).sub;
  try {
    const timer = await timerController.getCurrentTimer(Number(userId));
    return res.status(200).send(timer);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
})

export default timerRouter;
