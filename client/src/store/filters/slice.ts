import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { FilterStatus } from '@types';

const LIMIT = 10;
const START_PAGE = 1;

export interface FiltersState {
  status: FilterStatus;
  query: string;
  page: number;
  limit: number;
}
const filtersInitialState: FiltersState = {
  status: FilterStatus.ALL,
  query: '',
  page: START_PAGE,
  limit: LIMIT,
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
    setPage(state, action: PayloadAction<number>) {
      return { ...state, page: action.payload };
    },
  },
});

export const { setFilterStatus, setQuery, setPage } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
