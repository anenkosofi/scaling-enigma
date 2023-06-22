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

type Options = {
  skip: number;
  limit: number;
  sort: {
    _id: number;
  };
};

export const getAll = controller(async (req: Request, res: Response) => {
  const { _id } = req.user as User;
  const { page = '1', limit = '10', query, completed } = req.query as Query;

  const params: Params = {
    owner: _id,
  };

  if (query) {
    params.text = { $regex: new RegExp(query, 'i') };
  }

  if (typeof completed === 'string') {
    params.completed = completed === 'true';
  }

  const options: Options = {
    skip: (Number(page) - 1) * Number(limit),
    limit: Number(limit),
    sort: { _id: -1 },
  };

  const [todos, total] = await Promise.all([
    Todo.find(params, '', options).select('-owner'),
    Todo.countDocuments(params),
  ]);

  res.json({
    todos,
    total,
  });
});
