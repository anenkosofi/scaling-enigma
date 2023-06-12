import express from 'express';

import { login, register } from '@controllers/users';
import { validateBody } from '@middlewares';
import { userSchemas } from '@models';

export const usersRouter = express.Router();

usersRouter.post(
  '/register',
  validateBody(userSchemas.userRegisterJoiSchema),
  register
);

usersRouter.post('/login', validateBody(userSchemas.userLoginJoiSchema), login);
