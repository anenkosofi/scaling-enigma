import { FilterStatus } from '@types';

import { SET_STATUS_FILTER, FilterState, FiltersAction } from '../types/filter';

const filterInitialState: FilterState = {
  status: FilterStatus.ALL,
};

export const filtersReducer = (
  state = filterInitialState,
  { type, payload }: FiltersAction
): FilterState => {
  switch (type) {
    case SET_STATUS_FILTER:
      return {
        ...state,
        status: payload,
      };

    default:
      return state;
  }
};
