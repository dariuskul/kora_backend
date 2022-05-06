import { Router, Request, Response } from 'express';
import { EStatus } from '../constants/status';
import { ERoles } from '../constants/user';

import * as userController from '../controllers/user.controller';
import { AuthenticateDTO, CreateUserDTO, UpdateUserDTO } from '../db/dto/user.dto';
import { authorize } from '../middlewares/authorize';
import { writeDataToEventSource } from '../services/internal/eventSource';
import { getRealTimeData } from '../services/internal/scheduler';
import { HttpError } from '../types/error';

const userRouter = Router();

userRouter.post('/', async (req: Request, res: Response) => {
  const payload: CreateUserDTO = req.body;
  try {
    const result = await userController.create(payload);
    return res.status(200).send(result);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

userRouter.get('/', authorize([ERoles.Admin, ERoles.Moderator]), async (req: Request, res: Response) => {
  try {
    const users = await userController.getAll();
    return res.status(200).send(users);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

userRouter.post('/login', async (req: Request, res: Response) => {
  const payload: AuthenticateDTO = req.body;
  try {
    const user = await userController.login(payload);
    return res.status(200).send(user);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

userRouter.patch('/', authorize(), async (req: Request, res: Response) => {
  const userId: string = (req.user as any).sub;
  const updateUser: UpdateUserDTO = req.body;

  try {
    await userController.update(userId, updateUser);
    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

userRouter.post('/add', async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await userController.addUser(email);
    return res.status(200).send(user);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

userRouter.get('/verification/:token', async (req: Request, res: Response) => {
  const token = req.params.token;
  try {
    const user = await userController.getUserByToken(token);
    return res.status(200).send(user);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

userRouter.get('/dashboard', authorize(), async (req: Request, res: Response) => {
  const userId: string = (req.user as any).sub;
  try {
    const dashboard = await userController.getDashBoardInfo(userId);
    return res.status(200).send(dashboard);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

userRouter.post('/restore-password', async (req: Request, res: Response) => {
  const email: string = req.body.email;
  try {
    const dashboard = await userController.sendPasswordRemindLink(email);
    return res.status(200).send(dashboard);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});

userRouter.delete('/:id', authorize(), async (req: Request, res: Response) => {
  const userId: string = (req.user as any).sub;
  const { id } = req.params;
  if (userId !== id && (req.user as any).role !== ERoles.Admin) {
    return res.sendStatus(403);
  }
  try {
    await userController.removeUser(Number(id));
    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});



userRouter.get('/admin/dashboard', authorize([ERoles.Admin, ERoles.Moderator]), async (req: Request, res: Response) => {
  const sendEvent = (_req: Request, res: Response) => {
    res.writeHead(200, {
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Content-Type': 'text/event-stream',
    });

    setInterval(async () => {
      const values = await getRealTimeData();
      writeDataToEventSource(res, JSON.stringify(values));
    }, 1000);

  };
  if (req.headers.accept === 'text/event-stream') {
    console.log('cia');
    sendEvent(req, res);
  } else {
    res.json({ message: 'Ok' });
  }
})

userRouter.post('/reset-password', async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  try {
    await userController.restorePassword(email, password);
    return res.sendStatus(200);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(EStatus[error.status]).json({ message: error.message });
    }
  }
});


export default userRouter;
