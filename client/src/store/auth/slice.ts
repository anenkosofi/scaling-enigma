import { createSlice, Reducer } from '@reduxjs/toolkit';

import { setAuthHeader } from '@services';
import { User, Token } from '@types';

import { login, getTokens } from './operations';

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
      .addCase(getTokens.pending, state => {
        return { ...state, isLoading: true };
      })
      .addCase(getTokens.fulfilled, (state, action) => {
        return {
          ...state,
          token: action.payload,
          isLoading: false,
        };
      })
      .addCase(getTokens.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload
            ? action.payload
            : 'Session expired. Please log in again.',
        };
      }),
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer as Reducer<AuthState>;
