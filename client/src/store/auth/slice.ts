import { createSlice } from '@reduxjs/toolkit';

import { setAuthHeader } from '@services';
import { User } from '@types';

import { login, refreshUser } from './operations';

export interface AuthState {
  user: User | null;
  token: {
    access: string | null;
  };
  authenticated: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
}

const authInitialState: AuthState = {
  user: null,
  token: {
    access: null,
  },
  authenticated: false,
  isLoading: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    logout(state) {
      setAuthHeader();
      return {
        ...state,
        user: null,
        token: {
          access: null,
        },
        authenticated: false,
      };
    },
  },
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
          user: action.payload.user,
          token: action.payload.token,
          authenticated: true,
          isLoading: false,
          error: null,
        };
      })
      .addCase(login.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload ? action.payload : 'An unknown error occured',
          isLoading: false,
        };
      })
      .addCase(refreshUser.pending, state => {
        return { ...state, isRefreshing: true };
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        return {
          ...state,
          user: action.payload.user,
          authenticated: true,
          isRefreshing: false,
        };
      })
      .addCase(refreshUser.rejected, state => {
        return {
          ...state,
          isRefreshing: false,
        };
      }),
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
