export const SET_STATUS_FILTER = 'SET_STATUS_FILTER';

export enum FilterStatuses {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export interface FilterState {
  status: FilterStatuses;
}

interface SetStatusFilterAction {
  type: typeof SET_STATUS_FILTER;
  payload: FilterStatuses;
}

export type FiltersAction = SetStatusFilterAction;
