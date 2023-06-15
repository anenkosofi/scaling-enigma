import { Request, Response, NextFunction } from 'express';
import { Unauthorized, Forbidden } from 'http-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { User } from '@models';

const { ACCESS_SECRET_KEY } = process.env;

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  try {
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized');
    }
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY) as JwtPayload;
    const user = await User.findById(id);
    if (!user || !user.accessToken) {
      throw new Unauthorized('Not authorized');
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'Invalid signature') {
      error.status = 401;
    }
    next(error);
  }
};
