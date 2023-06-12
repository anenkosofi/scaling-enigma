import { RootState } from '@store';

export const selectUser = (state: RootState) => state.auth.user;

export const selectIsAuthorized = (state: RootState) =>
  state.auth.authenticated;
