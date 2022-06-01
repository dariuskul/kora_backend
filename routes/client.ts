import { Request, Response, Router } from 'express';
import { EStatus } from '../constants/status';
import { ERoles } from '../constants/user';
import * as clientController from '../controllers/client.controller';
import { CreateClientDTO } from '../db/dto/client.dto';
import { authorize } from '../middlewares/authorize';
import { HttpError } from '../types/error';

const clientsRouter = Router();

clientsRouter.get('/', authorize([ERoles.Admin]), async (req: Request, res: Response) => {
  try {
    const clients = await clientController.getAll();
    return res.status(200).send(clients);
  }
  catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
})

clientsRouter.get('/:id', authorize([ERoles.Admin]), async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  try {
    const client = await clientController.getById(id);
    return res.status(200).send(client);
  }
  catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

clientsRouter.post('/', authorize([ERoles.Admin]), async (req: Request, res: Response) => {
  const payload: CreateClientDTO = req.body;
  try {
    const client = await clientController.create(payload);
    return res.status(200).send(client);
  }
  catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

clientsRouter.delete('/:id', authorize([ERoles.Admin]), async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  try {
    await clientController.remove(id);
    return res.status(200).send();
  }
  catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

clientsRouter.patch('/:id', authorize([ERoles.Admin]), async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const payload: CreateClientDTO = req.body;
  try {
    const client = await clientController.update(id, payload);
    return res.status(200).send(client);
  }
  catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});


clientsRouter.patch('/add-client/:id', authorize(ERoles.Admin), async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const clientId: number = Number(req.body.clientId);
  try {
    const task = await clientController.addClientToProject(id, clientId);
    return res.status(200).send(task);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});
export default clientsRouter;