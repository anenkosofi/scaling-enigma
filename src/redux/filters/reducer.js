import { statusFilters } from './constants';

const filterInitialState = {
  status: statusFilters.all,
};

export const filtersReducer = (
  state = filterInitialState,
  { type, payload }
) => {
  switch (type) {
    case 'filters/setStatusFilter':
      return {
        ...state,
        status: payload,
      };

    default:
      return state;
  }
};
