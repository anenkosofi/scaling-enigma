import express from 'express';

import { login, register, getCurrent } from '@controllers/users';
import { validateBody, auth } from '@middlewares';
import { userSchemas } from '@models';

export const usersRouter = express.Router();

usersRouter.post(
  '/register',
  validateBody(userSchemas.userRegisterJoiSchema),
  register
);

usersRouter.post('/login', validateBody(userSchemas.userLoginJoiSchema), login);

usersRouter.get('/current', auth, getCurrent);
