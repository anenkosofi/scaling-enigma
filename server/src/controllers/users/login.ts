import { Request, Response } from 'express';
import { Unauthorized } from 'http-errors';
import jwt from 'jsonwebtoken';

import { User } from '@models';

const { SECRET_KEY } = process.env;

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong');
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email,
      username: user.username,
    },
  });
};
