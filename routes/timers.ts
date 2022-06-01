import { Request, Response, Router } from 'express';
import { EStatus } from '../constants/status';
import * as timerController from '../controllers/timer.controller';
import { IUpdateTimerDTO } from '../db/dto/timer.dto';
import { authorize } from '../middlewares/authorize';
import { writeDataToEventSource } from '../services/internal/eventSource';
import { calculateValues } from '../services/internal/scheduler';
import { HttpError } from '../types/error';
import { Chain } from 'repeat'

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

timerRouter.patch('/time', authorize(), async (req: Request, res: Response) => {
  const taskId = req.body.taskId;
  const duration = req.body.duration;
  const date = req.body.date;
  const userId = req.body.userId;
  try {
    await timerController.editTaskTimer(userId, taskId, duration, date);
    return res.sendStatus(201);
  } catch (error) {

  }
})

timerRouter.post('/stop/:userId?', authorize(), async (req: Request, res: Response) => {
  let userId;
  if (req.params.userId) {
    userId = Number(req.params.userId);
  } else {
    userId = (req.user as any).sub;
  }
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

timerRouter.get('/synchronize', authorize(), async (req: Request, res: Response) => {
  try {
    await timerController.synchronizeData();
    return res.sendStatus(201);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
})

timerRouter.get('/events', authorize(), async (req: Request, res: Response) => {
  let isFinished = false;
  let chain = new Chain();
  const sendEvent = (_req: Request, res: Response) => {
    res.writeHead(200, {
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Content-Type': 'text/event-stream',
    });
    const test = async () => {
      let arrayOfNotifs = [];
      // let showWarnings = [];
      await calculateValues(arrayOfNotifs, []);
      writeDataToEventSource(res, JSON.stringify({ showNotifsTo: arrayOfNotifs }));
    }
    chain.every(1000).do(test);
  };
  // 1 sec to milliseconds 
  if (req.headers.accept === 'text/event-stream') {
    sendEvent(req, res);
  } else {
    res.json({ message: 'Ok' });
  }
})

// write a function which executes a function fully and then after 5 seconds repeats the function 


export default timerRouter;
