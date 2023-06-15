import { Request, Response } from 'express';

import { controller } from '@utils';

export const getCurrent = controller(async (req: Request, res: Response) => {
  const { email, username } = req.user;
  res.json({
    user: {
      email,
      username,
    },
  });
});
