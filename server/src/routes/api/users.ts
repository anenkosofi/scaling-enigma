import express from 'express';

import { login, register, getCurrent, refresh } from '@controllers/users';
import { validateBody, auth } from '@middlewares';
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

usersRouter.get('/current', auth, getCurrent);
