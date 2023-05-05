import { FilterStatuses } from '../../types/filters';

export const SET_STATUS_FILTER = 'filters/setStatusFilter';

export interface FilterState {
  status: FilterStatuses;
}

interface SetStatusFilterAction {
  type: typeof SET_STATUS_FILTER;
  payload: FilterStatuses;
}

export type FiltersAction = SetStatusFilterAction;
