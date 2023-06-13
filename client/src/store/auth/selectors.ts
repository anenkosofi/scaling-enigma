import { RootState } from '@store';

export const selectUser = (state: RootState) => state.auth.user;

export const selectIsAuthorized = (state: RootState) =>
  state.auth.authenticated;

export const selectIsLoading = (state: RootState) => state.auth.isLoading;

export const selectError = (state: RootState) => state.auth.error;

export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
