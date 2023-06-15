import { Request, Response, NextFunction } from 'express';

type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const controller = (controllerFunc: Controller) => {
  const func = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllerFunc(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};
