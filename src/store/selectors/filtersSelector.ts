import { RootState } from '../store';

export const getStatusFilter = (state: RootState) => state.filters.status;
