import { Request, Response } from 'express';

import { Todo } from '@models';
import { controller } from '@utils';

interface UserRequest extends Request {
  user: {
    _id: string;
  };
}

export const getAll = controller(async (req: UserRequest, res: Response) => {
  const { _id } = req.user;
  const query = {
    owner: _id,
  };
  const todos = await Todo.find(query).select('-owner');
  res.json(todos);
});
