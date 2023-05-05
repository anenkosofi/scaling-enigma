import {
  SET_STATUS_FILTER,
  FilterState,
  FiltersAction,
} from '../types/filters';
import { FilterStatuses } from '../../types/filters';

const filterInitialState: FilterState = {
  status: FilterStatuses.ALL,
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
