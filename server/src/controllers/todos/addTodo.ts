import { Request, Response } from 'express';

import { Todo } from '@models';
import { controller } from '@utils';

export const addTodo = controller(async (req: Request, res: Response) => {
  const { _id } = req.user;
  const newTodo = await Todo.create({ ...req.body, owner: _id });
  const { _id: todoId, text, completed, time } = newTodo;
  res.status(201).json({
    todo: {
      _id: todoId,
      text,
      completed,
      time,
    },
  });
});
