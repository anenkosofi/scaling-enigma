import { FilterStatus } from '@types';

export const SET_STATUS_FILTER = 'filters/setStatusFilter';

export interface FilterState {
  status: FilterStatus;
}

interface SetStatusFilterAction {
  type: typeof SET_STATUS_FILTER;
  payload: FilterStatus;
}

export type FiltersAction = SetStatusFilterAction;
