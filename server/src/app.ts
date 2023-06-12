import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'dotenv/config';

import { todosRouter } from '@routes/api/todos';
import { usersRouter } from '@routes/api/users';

const app = express();

interface IError extends Error {
  status: number;
  message: string;
}

const corsOptions = {
  origin: 'https://todo-app-frontend-9gwb.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', usersRouter);
app.use('/api/todos', todosRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err: IError, _req: Request, res: Response, _next: NextFunction) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;
