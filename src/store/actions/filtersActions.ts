import {
  SET_STATUS_FILTER,
  FilterStatuses,
  FiltersAction,
} from '../types/filters';

export const setStatusFilter = (value: FilterStatuses): FiltersAction => {
  return {
    type: SET_STATUS_FILTER,
    payload: value,
  };
};
