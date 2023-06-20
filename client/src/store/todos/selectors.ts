import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store';
import { selectStatusFilter } from '@store/filters/selectors';
import { FilterStatus } from '@types';

export const selectTodos = (state: RootState) => state.todos.items;

export const selectIsLoading = (state: RootState) => state.todos.isLoading;

export const selectError = (state: RootState) => state.todos.error;

export const selectVisibleTodos = createSelector(
  [selectTodos, selectStatusFilter],
  (todos, filter) => {
    switch (filter) {
      case FilterStatus.ACTIVE:
        return todos.filter(todo => !todo.completed);

      case FilterStatus.COMPLETED:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }
);
