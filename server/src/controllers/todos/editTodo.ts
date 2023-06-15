import { Request, Response } from 'express';
import { NotFound } from 'http-errors';

import { Todo } from '@models';
import { controller } from '@utils';

export const editTodo = controller(async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const { _id } = req.user;
  const updatedTodo = await Todo.findByIdAndUpdate(
    {
      owner: _id,
      _id: todoId,
    },
    req.body,
    { new: true }
  ).select('-owner');
  if (!updatedTodo) {
    throw new NotFound(`Todo with id=${todoId} is not found`);
  }
  res.json({
    todo: updatedTodo,
  });
});
