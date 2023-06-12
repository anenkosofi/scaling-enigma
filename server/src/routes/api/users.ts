import express from 'express';

import { login } from '@controllers/users';
import { validateBody } from '@middlewares';
import { userSchemas } from '@models';

export const usersRouter = express.Router();

usersRouter.post('/login', validateBody(userSchemas.userJoiSchema), login);
