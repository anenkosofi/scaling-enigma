import { Request, Response } from 'express';

import { Todo } from '@models';

export const deleteCompleted = async (req: Request, res: Response) => {
  const { _id } = req.user;
  const result = await Todo.deleteMany({
    owner: _id,
    completed: true,
  });

  res.json({
    message: `${result.deletedCount} completed todos deleted successfully`,
  });
};
