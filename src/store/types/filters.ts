export const SET_STATUS_FILTER = 'filters/setStatusFilter';

export enum FilterStatuses {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface FilterState {
  status: FilterStatuses;
}

interface SetStatusFilterAction {
  type: typeof SET_STATUS_FILTER;
  payload: FilterStatuses;
}

export type FiltersAction = SetStatusFilterAction;
