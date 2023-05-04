import { RootState } from '../reducers';

export const getStatusFilter = (state: RootState) => state.filters.status;
