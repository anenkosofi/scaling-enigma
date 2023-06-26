import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { instance } from '@services';
import { RootState } from '@store';
import { Todo, FilterStatus } from '@types';

type Params = {
  page: number;
  limit: number;
  query?: string;
  completed?: boolean;
};

export const getTodos = createAsyncThunk<
  { todos: Todo[]; total: number },
  undefined,
  { rejectValue: string }
>('todos/getAll', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const { query, status, page, limit } = state.filters;
    const params: Params = {
      page,
      limit,
    };
    if (query.length) {
      params.query = query;
    }
    if (status === FilterStatus.ACTIVE) {
      params.completed = false;
    } else if (status === FilterStatus.COMPLETED) {
      params.completed = true;
    }
    const response = await instance.get('/todos', {
      params,
      paramsSerializer: function paramsSerializer(params) {
        return Object.entries(Object.assign({}, params))
          .map(([key, value]) => `${key}=${value}`)
          .join('&');
      },
    });
    return response.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response?.data?.message) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred.');
  }
});

export const addTodo = createAsyncThunk<
  { todo: Todo; query: string },
  Omit<Todo, '_id'>,
  { rejectValue: string }
>('todos/addTodo', async (todo, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const query = state.filters.query;
    const { data } = await instance.post('/todos', todo);
    return { todo: data.todo, query };
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response?.data?.message) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred.');
  }
});

export const editTodo = createAsyncThunk<
  { todo: Todo; status: FilterStatus },
  Omit<Todo, 'completed'> | Pick<Todo, 'completed' | '_id'>,
  { rejectValue: string }
>('todos/editTodo', async ({ _id, ...rest }, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const status = state.filters.status;
    const { data } = await instance.patch(`/todos/${_id}`, rest);
    return { todo: data.todo, status };
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response?.data?.message) {
      return thunkAPI.rejectWithValue(e.response.data.message);
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
    if (axios.isAxiosError(e) && e.response?.data?.message) {
      return thunkAPI.rejectWithValue(e.response.data.message);
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
    if (axios.isAxiosError(e) && e.response?.data?.message) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred.');
  }
});
