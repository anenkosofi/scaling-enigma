import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { FilterStatus } from '@types';

export interface FiltersState {
  status: FilterStatus;
  query: string;
}
const filtersInitialState: FiltersState = {
  status: FilterStatus.ALL,
  query: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setFilterStatus(state, action: PayloadAction<FilterStatus>) {
      return { ...state, status: action.payload };
    },
    setQuery(state, action: PayloadAction<string>) {
      return { ...state, query: action.payload };
    },
  },
});

export const { setFilterStatus, setQuery } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
