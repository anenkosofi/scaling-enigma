import { Request, Response } from 'express';
import { Forbidden } from 'http-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { User } from '@models';
import { controller } from '@utils';

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

export const refresh = controller(async (req: Request, res: Response) => {
  const { token } = req.body;
  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY) as JwtPayload;
    const doesExist = await User.findOne({ refreshToken: token });
    if (!doesExist) {
      throw new Forbidden('Token expired');
    }
    const payload = {
      id,
    };
    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: '1m',
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: '2m',
    });
    await User.findByIdAndUpdate(id, { accessToken, refreshToken });
    res.json({
      token: {
        access: accessToken,
        refresh: refreshToken,
      },
    });
  } catch (error) {
    throw new Forbidden(error.message);
  }
});
