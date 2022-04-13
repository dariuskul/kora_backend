import { Request, Response, Router } from 'express';
import { EStatus } from '../constants/status';
import * as timerController from '../controllers/timer.controller';
import { IUpdateTimerDTO } from '../db/dto/timer.dto';
import { authorize } from '../middlewares/authorize';
import { writeDataToEventSource } from '../services/internal/eventSource';
import { calculateValues } from '../services/internal/scheduler';
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

timerRouter.patch('/:id', authorize(), async (req: Request, res: Response) => {
  const timerId = req.params.id;
  const payload = req.body as IUpdateTimerDTO;
  try {
    const timer = await timerController.updateTimer(Number(timerId), payload);
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

timerRouter.get('/events', authorize(), async (req: Request, res: Response) => {
  const sendEvent = (_req: Request, res: Response) => {
    res.writeHead(200, {
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Content-Type': 'text/event-stream',
    });

    setInterval(async () => {
      const values = await calculateValues();
      writeDataToEventSource(res, JSON.stringify(values));
    }, 5000);

  };
  if (req.headers.accept === 'text/event-stream') {
    sendEvent(req, res);
  } else {
    res.json({ message: 'Ok' });
  }
})

export default timerRouter;
