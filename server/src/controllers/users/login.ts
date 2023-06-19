import { Request, Response } from 'express';
import { Unauthorized } from 'http-errors';
import jwt from 'jsonwebtoken';

import { User } from '@models';
import { controller } from '@utils';
import { TokenLifetime } from '@types';

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

export const login = controller(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong');
  }
  const payload = {
    id: user._id,
  };
  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: TokenLifetime.ACCESS,
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: TokenLifetime.REFRESH,
  });
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });
  res.json({
    token: {
      access: accessToken,
      refresh: refreshToken,
    },
    user: {
      email,
      username: user.username,
    },
  });
});
