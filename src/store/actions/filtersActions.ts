import { SET_STATUS_FILTER, FiltersAction } from '../types/filters';
import { FilterStatuses } from '../../types/filters';

export const setStatusFilter = (value: FilterStatuses): FiltersAction => {
  return {
    type: SET_STATUS_FILTER,
    payload: value,
  };
};
