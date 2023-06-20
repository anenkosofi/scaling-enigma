import { createSlice, Reducer } from '@reduxjs/toolkit';

import { setAuthHeader } from '@services';
import { User, Token } from '@types';

import { register, login, getTokens } from './operations';

export interface AuthState {
  user: User | null;
  token: Token | null;
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
  reducers: {
    logout(state) {
      setAuthHeader();
      return {
        ...state,
        user: null,
        token: null,
        authenticated: false,
      };
    },
  },
  extraReducers: builder =>
    builder
      .addCase(register.pending, state => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(register.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        return {
          ...state,
          user: user,
          token: token,
          authenticated: true,
          isLoading: false,
          error: null,
        };
      })
      .addCase(register.rejected, (state, { payload }) => {
        return {
          ...state,
          error: payload ? payload : 'An unknown error occured',
          isLoading: false,
        };
      })
      .addCase(login.pending, state => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        return {
          ...state,
          user: user,
          token: token,
          authenticated: true,
          isLoading: false,
          error: null,
        };
      })
      .addCase(login.rejected, (state, { payload }) => {
        return {
          ...state,
          error: payload ? payload : 'An unknown error occured',
          isLoading: false,
        };
      })
      .addCase(getTokens.pending, state => {
        return { ...state, isLoading: true };
      })
      .addCase(getTokens.fulfilled, (state, { payload }) => {
        return {
          ...state,
          token: payload,
          isLoading: false,
        };
      })
      .addCase(getTokens.rejected, (state, { payload }) => {
        return {
          ...state,
          isLoading: false,
          error: payload ? payload : 'Session expired. Please log in again.',
        };
      }),
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer as Reducer<AuthState>;
