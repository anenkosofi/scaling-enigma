import { createAsyncThunk } from '@reduxjs/toolkit';

import { instance } from '@services';
import { Todo } from '@types';

export const getTodos = createAsyncThunk<
  Todo[],
  undefined,
  { rejectValue: string }
>('todos/getAll', async (_, thunkAPI) => {
  try {
    const response = await instance.get('/todos');
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
    const response = await instance.post('/todos', todo);
    return response.data.todo;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return thunkAPI.rejectWithValue(e.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred.');
  }
});

export const editTodo = createAsyncThunk<
  Todo,
  Omit<Todo, 'completed'> | Pick<Todo, 'completed' | '_id'>,
  { rejectValue: string }
>('todos/editTodo', async ({ _id, ...rest }, thunkAPI) => {
  try {
    const response = await instance.patch(`/todos/${_id}`, rest);
    return response.data.todo;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return thunkAPI.rejectWithValue(e.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred.');
  }
});

export const deleteTodo = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string }
>('todo/deleteTodo', async (_id, thunkAPI) => {
  try {
    const response = await instance.delete(`/todos/${_id}`);
    return response.data.todo;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return thunkAPI.rejectWithValue(e.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred.');
  }
});

export const deleteCompleted = createAsyncThunk<
  string,
  undefined,
  { rejectValue: string }
>('todo/deleteCompleted', async (_, thunkAPI) => {
  try {
    const response = await instance.delete('todos/completed');
    return response.data.message;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return thunkAPI.rejectWithValue(e.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred.');
  }
});
