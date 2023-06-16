import { createAsyncThunk } from '@reduxjs/toolkit';

import { instance, setAuthHeader } from '@services';
import { RootState } from '@store';
import { LoggedUser } from '@types';

export const login = createAsyncThunk<
  LoggedUser,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const response = await instance.post<LoggedUser>('/users/login', {
      email,
      password,
    });
    setAuthHeader(response.data.token.access);
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
    const persistedToken = state.auth.token.access;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to get user!');
    }
    try {
      setAuthHeader(persistedToken);
      const response = await instance.get('/users/current');
      return response.data;
    } catch (e: unknown) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred.');
    }
  }
);
