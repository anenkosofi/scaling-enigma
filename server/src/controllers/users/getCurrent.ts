import { Request, Response } from 'express';

export const getCurrent = async (req: Request, res: Response) => {
  const { email, username } = req.user;
  res.json({
    user: {
      email,
      username,
    },
  });
};
