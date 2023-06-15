import express from 'express';

import {
  getAll,
  addTodo,
  editTodo,
  deleteTodo,
  deleteCompleted,
} from '@controllers/todos';
import { auth, validateBody, validateId } from '@middlewares';
import { todoSchemas } from '@models';

export const todosRouter = express.Router();

todosRouter.get('/', auth, getAll);

todosRouter.post(
  '/',
  auth,
  validateBody(todoSchemas.addedTodoJoiSchema),
  addTodo
);

todosRouter.patch(
  '/:todoId',
  auth,
  validateId,
  validateBody(todoSchemas.editedTodoJoiSchema),
  editTodo
);

todosRouter.delete('/completed', auth, deleteCompleted);

todosRouter.delete('/:todoId', auth, validateId, deleteTodo);
