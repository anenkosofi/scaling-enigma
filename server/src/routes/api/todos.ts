import express from 'express';

import { getAll } from '@controllers/todos';
import { auth } from '@middlewares';

export const todosRouter = express.Router();

todosRouter.get('/', auth, getAll);
