import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { RootState } from '@store';
import { store } from '@store';
import { LoggedUser } from '@types';

import { logout } from './slice';

export const instance = axios.create({
  baseURL: 'https://todo-app-backend-igep.onrender.com/api',
});

export const setAuthHeader = (token?: string) => {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common.Authorization;
  }
};

instance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

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
