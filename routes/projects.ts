import { Router, Request, Response } from 'express';
import { EStatus } from '../constants/status';
import { ERoles } from '../constants/user';

import * as projectController from '../controllers/project.controller';
import { CreateProjectDTO, IProjectFilters, UpdateProjectDTO } from '../db/dto/project.dto';
import { authorize } from '../middlewares/authorize';
import { HttpError } from '../types/error';

const projectRouter = Router();

projectRouter.delete('/:id', authorize([ERoles.Admin]), async (req: Request, res: Response) => {
  const projectId: string = req.params.id;
  try {
    await projectController.remove(Number(projectId));
    return res.sendStatus(200);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

projectRouter.post('/', authorize(), async (req: Request, res: Response) => {
  const payload: CreateProjectDTO = req.body;
  const userId = req.user.sub;
  try {
    const project = await projectController.create(userId, payload);
    return res.status(200).send(project);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

projectRouter.get('/', authorize(), async (req: Request, res: Response) => {
  const userId = (req?.user as any).sub;
  const filters: IProjectFilters = req.query;
  try {
    const projects = await projectController.getAll(userId, filters);
    return res.status(200).send(projects);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

projectRouter.get('/:id', authorize(), async (req: Request, res: Response) => {
  const projectId: string = req.params.id;
  try {
    const project = await projectController.getById(Number(projectId));
    return res.status(200).send(project);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

projectRouter.put('/:id', authorize(), async (req: Request, res: Response) => {
  const projectId: string = req.params.id;
  const payload: UpdateProjectDTO = req.body;
  try {
    const project = await projectController.update(Number(projectId), payload);
    return res.status(200).send(project);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

export default projectRouter;
