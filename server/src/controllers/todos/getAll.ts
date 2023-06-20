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

export const getAll = controller(async (req: UserRequest, res: Response) => {
  const { _id } = req.user;
  const { query } = req.query;

  const todos = await Todo.aggregate([
    {
      $match: {
        text: { $regex: new RegExp(query, 'i') },
        owner: _id,
      },
    },
    {
      $project: {
        owner: 0,
      },
    },
  ]);

  res.json(todos);
});
