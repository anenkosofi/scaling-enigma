import { RootState } from '@store';

export const selectStatusFilter = (state: RootState) => state.filters.status;

export const selectQuery = (state: RootState) => state.filters.query;
