import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AUTH } from '../config';
import User from '../db/models/user';
export const authorize = (roles?: Array<string> | string) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return [
    async (req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, AUTH.JWT, async (err, user) => {
          if (err) {
            return res.sendStatus(403);
          }
          const userInfo = await User.findByPk(user?.sub as any);
          if (!userInfo || (roles?.length && !roles.includes(userInfo.role))) {
            return res.sendStatus(403);
          }
          req.user = user;
          next();
        });
      } else {
        res.sendStatus(401);
      }
    }
  ];
};
