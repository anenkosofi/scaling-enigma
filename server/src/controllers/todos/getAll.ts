import { Request, Response } from 'express';

import { Todo } from '@models';
import { controller } from '@utils';

interface UserRequest extends Request {
  user: {
    _id: string;
  };
  query: {
    query: string;
  };
}

type Params = {
  owner: string;
  query?: string;
};

export const getAll = controller(async (req: UserRequest, res: Response) => {
  const { _id } = req.user;
  const { query } = req.query;
  const params: Params = {
    owner: _id,
  };
  if (query) {
    params.query = query;
  }
  const todos = await Todo.find(params).select('-owner');
  res.json(todos);
});
