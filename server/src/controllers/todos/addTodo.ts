import { Request, Response } from 'express';

import { Todo } from '@models';

export const addTodo = async (req: Request, res: Response) => {
  const { _id } = req.user;
  const newTodo = await Todo.create({ ...req.body, owner: _id });
  res.status(201).json({
    todo: newTodo,
  });
};
