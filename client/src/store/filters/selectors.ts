import { RootState } from '@store';

export const selectStatusFilter = (state: RootState) => state.filters.status;