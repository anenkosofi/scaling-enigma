import { FilterStatus } from '@types';

import { SET_STATUS_FILTER, FiltersAction } from '../types/filter';

export const setStatusFilter = (value: FilterStatus): FiltersAction => {
  return {
    type: SET_STATUS_FILTER,
    payload: value,
  };
};
