import express from 'express';

import { login, register, refresh } from '@controllers/users';
import { validateBody } from '@middlewares';
import { userSchemas } from '@models';

export const usersRouter = express.Router();

usersRouter.post(
  '/register',
  validateBody(userSchemas.userRegisterJoiSchema),
  register
);

usersRouter.post('/login', validateBody(userSchemas.userLoginJoiSchema), login);

usersRouter.post(
  '/refresh',
  validateBody(userSchemas.refreshTokenJoiSchema),
  refresh
);
