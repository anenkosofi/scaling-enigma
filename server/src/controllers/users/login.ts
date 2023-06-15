import { Request, Response } from 'express';
import { Unauthorized } from 'http-errors';
import jwt from 'jsonwebtoken';

import { User } from '@models';
import { controller } from '@utils';

const { ACCESS_SECRET_KEY } = process.env;

export const login = controller(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong');
  }
  const payload = {
    id: user._id,
  };
  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: '1m' });
  await User.findByIdAndUpdate(user._id, { accessToken });
  res.json({
    token: {
      access: accessToken,
    },
    user: {
      email,
      username: user.username,
    },
  });
});
