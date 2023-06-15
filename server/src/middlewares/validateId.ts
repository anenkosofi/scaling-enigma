import { Request, Response, NextFunction } from 'express';
import { BadRequest } from 'http-errors';

import { isValidObjectId } from 'mongoose';

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { todoId } = req.params;
  if (!isValidObjectId(todoId)) {
    next(BadRequest(`${todoId} is not valid id`));
  }
  next();
};
