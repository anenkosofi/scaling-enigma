import { statusFilters } from './constants';

const filterInitialState = {
  status: statusFilters.all,
};

export const filtersReducer = (state = filterInitialState, action) => {
  switch (action.type) {
    case 'filters/setStatusFilter':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};
