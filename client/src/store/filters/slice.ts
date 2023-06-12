import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { FilterStatus } from '@types';

interface FiltersState {
  status: FilterStatus;
}
const filtersInitialState: FiltersState = {
  status: FilterStatus.ALL,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setFilterStatus(state, action: PayloadAction<FilterStatus>) {
      return { ...state, status: action.payload };
    },
  },
});

export const { setFilterStatus } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
