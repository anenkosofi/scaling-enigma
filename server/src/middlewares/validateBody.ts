import { Request, Response, NextFunction } from 'express';
import { BadRequest } from 'http-errors';
import Joi from 'joi';

export const validateBody = (schema: Joi.ObjectSchema) => {
  const func = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(BadRequest(error.message));
    }
    next();
  };

  return func;
};
