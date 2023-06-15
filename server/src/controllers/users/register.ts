import { Request, Response } from 'express';
import { Conflict } from 'http-errors';

import { User } from '@models';
import { controller } from '@utils';

export const register = controller(async (req: Request, res: Response) => {
  const { password, email, username } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Email in use');
  }
  const newUser = new User({
    email,
    username,
  });
  newUser.setPassword(password);
  await newUser.save();
  res.status(201).json({
    user: {
      email,
      username,
    },
  });
});
