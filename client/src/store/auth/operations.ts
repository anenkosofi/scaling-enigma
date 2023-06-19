import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { instance, setAuthHeader } from '@services';
import { RootState } from '@store';
import { LoggedUser, Token } from '@types';

export const register = createAsyncThunk<
  LoggedUser,
  { username: string; email: string; password: string },
  { rejectValue: string }
>('auth/register', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('/users/register', credentials);
    setAuthHeader(response.data.token.access);
    return response.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e) && e.response?.data?.message) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred.');
  }
});

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
    if (axios.isAxiosError(e) && e.response?.data?.message) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred.');
  }
});

export const getTokens = createAsyncThunk<
  Token,
  undefined,
  { rejectValue: string }
>('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const token = state.auth.token?.refresh;
  try {
    const response = await instance.post('/users/refresh', {
      token,
    });
    return response.data.token as Token;
  } catch (e: unknown) {
    return thunkAPI.rejectWithValue('Session expired. Please log in again.');
  }
});
