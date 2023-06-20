import { Request, Response } from 'express';
import { Conflict } from 'http-errors';
import jwt from 'jsonwebtoken';

import { User } from '@models';
import { controller } from '@utils';
import { TokenLifetime } from '@types';

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

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
  const payload = {
    id: newUser._id,
  };
  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
    expiresIn: TokenLifetime.ACCESS,
  });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: TokenLifetime.REFRESH,
  });
  await User.findByIdAndUpdate(newUser._id, { accessToken, refreshToken });
  res.status(201).json({
    token: {
      access: accessToken,
      refresh: refreshToken,
    },
    user: {
      email,
      username,
    },
  });
});
