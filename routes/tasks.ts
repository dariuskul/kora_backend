import { parse } from 'csv';
import { Router, Request, Response } from 'express';
import { Readable } from 'stream'
import * as fs from 'fs';
import multer from 'multer';
import { EStatus } from '../constants/status';

import * as taskController from '../controllers/task.controller';
import { CreateTaskDTO, TaskFilters } from '../db/dto/task.dto';
import { authorize } from '../middlewares/authorize';
import { HttpError } from '../types/error';
import { ERoles } from '../constants/user';

const taskRouter = Router();

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
taskRouter.post('/check', authorize(), upload.single('test'), async (req: Request, res: Response) => {
  try {
    const test = await taskController.checkCsvFile(req.file);
    return res.status(200).send(test);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

taskRouter.patch('/:taskId', authorize(), async (req: Request, res: Response) => {
  const taskId: string = req.params.taskId;
  const updateTask: CreateTaskDTO = req.body;
  try {
    const result = await taskController.updateTask(Number(taskId), updateTask);
    return res.status(200).send(result);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

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

taskRouter.get('/available-tasks/:projectId?', authorize(), async (req: Request, res: Response) => {
  const userId = (req.user as any).sub;
  const projectId = Number(req.params.projectId);
  const filters: any = req.query;
  try {
    const tasks = await taskController.getAvailableTasks(userId, filters, projectId);
    return res.status(200).send(tasks);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
})

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

taskRouter.delete('/:id', authorize([ERoles.Admin]), async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  try {
    const task = await taskController.removeTask(id);
    return res.status(200).send(task);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});



export default taskRouter;
