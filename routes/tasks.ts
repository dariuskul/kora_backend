import { Router, Request, Response } from 'express';
import { EStatus } from '../constants/status';

import * as taskController from '../controllers/task.controller';
import { CreateTaskDTO } from '../db/dto/task.dto';
import { authorize } from '../middlewares/authorize';
import { HttpError } from '../types/error';

const taskRouter = Router();

taskRouter.post('/:projectId?', authorize(), async (req: Request, res: Response) => {
  const payload: CreateTaskDTO = req.body;
  const projectId: number | undefined = Number(req.params.projectId);
  try {
    const task = await taskController.create(payload, projectId);
    return res.status(200).send(task);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

taskRouter.get('/', authorize(), async (req: Request, res: Response) => {
  const userId = (req.user as any).sub;
  try {
    const tasks = await taskController.getAll(userId);
    return res.status(200).send(tasks);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

taskRouter.get('/:projectId', authorize(), async (req: Request, res: Response) => {
  const projectId: number = Number(req.params.projectId);
  try {
    const tasks = await taskController.getTasksByProjectId(projectId);
    return res.status(200).send(tasks);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

taskRouter.get('/user-tasks/:id?', authorize(), async (req: Request, res: Response) => {
  const userId: number = Number(req.params.id);
  try {
    const tasks = await taskController.getUserTasks(userId || (req.user as any).sub);
    return res.status(200).send(tasks);
  }
  catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
})

export default taskRouter;
