import { createSlice } from '@reduxjs/toolkit';

import { User } from '@types';

import { login } from './operations';

export interface AuthState {
  user: User | null;
  token: string | null;
  authenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const authInitialState: AuthState = {
  user: null,
  token: null,
  authenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(login.pending, state => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(login.fulfilled, (state, action) => {
        return {
          ...state,
          user: { ...action.payload.user },
          token: action.payload.token,
          authenticated: true,
          isLoading: false,
        };
      })
      .addCase(login.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload ? action.payload : 'An unknown error occured',
          isLoading: false,
        };
      }),
});

export const authReducer = authSlice.reducer;