import { Request, Response } from 'express';
import { NotFound } from 'http-errors';

import { Todo } from '@models';
import { controller } from '@utils';

export const deleteTodo = controller(async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const { _id } = req.user;
  const removedTodo = await Todo.findByIdAndRemove({
    owner: _id,
    _id: todoId,
  });
  if (!removedTodo) {
    throw new NotFound(`Todo with id=${todoId} is not found`);
  }
  res.json({
    todo: removedTodo,
  });
});
