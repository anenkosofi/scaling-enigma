import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Todo } from '@types';

export const getTodos = createAsyncThunk<
  Todo[],
  undefined,
  { rejectValue: string }
>('todos/getAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/todos');
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return thunkAPI.rejectWithValue(e.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred.');
  }
});

export const addTodo = createAsyncThunk<
  Todo,
  Omit<Todo, '_id'>,
  { rejectValue: string }
>('todos/addTodo', async (todo, thunkAPI) => {
  try {
    const response = await axios.post('/todos', todo);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return thunkAPI.rejectWithValue(e.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred.');
  }
});
