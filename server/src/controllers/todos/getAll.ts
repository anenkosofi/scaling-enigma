import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';

import { Todo } from '@models';
import { controller } from '@utils';
import { Query, User } from '@types';

type Params = {
  owner: ObjectId;
  text?: { $regex: RegExp };
  completed?: boolean;
};

export const getAll = controller(async (req: Request, res: Response) => {
  const { _id } = req.user as User;
  const { query, completed } = req.query as Query;

  const params: Params = {
    owner: _id,
  };

  if (query) {
    params.text = { $regex: new RegExp(query, 'i') };
  }

  if (typeof completed === 'boolean') {
    params.completed = completed;
  }

  const todos = await Todo.aggregate([
    {
      $match: params,
    },
    {
      $project: {
        owner: 0,
      },
    },
  ]);

  res.json(todos);
});
