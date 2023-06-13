import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '@store';
import { LoggedUser } from '@types';

axios.defaults.baseURL = 'https://todo-app-backend-igep.onrender.com/api';

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const login = createAsyncThunk<
  LoggedUser,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const response = await axios.post<LoggedUser>('/users/login', {
      email,
      password,
    });
    setAuthHeader(response.data.token);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return thunkAPI.rejectWithValue(e.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred.');
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to get user!');
    }
    try {
      setAuthHeader(persistedToken);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred.');
    }
  }
);
