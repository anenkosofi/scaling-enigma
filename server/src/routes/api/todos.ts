import express from 'express';

import { getAll, addTodo } from '@controllers/todos';
import { auth, validateBody } from '@middlewares';
import { todoSchemas } from '@models';

export const todosRouter = express.Router();

todosRouter.get('/', auth, getAll);

todosRouter.post(
  '/',
  auth,
  validateBody(todoSchemas.addedTodoJoiSchema),
  addTodo
);
