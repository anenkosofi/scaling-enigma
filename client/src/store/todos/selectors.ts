import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store';
import { selectStatusFilter } from '@store/filters/selectors';
import { FilterStatus } from '@types';

export const selectTodos = (state: RootState) => state.todos.items;

export const selectQuery = (state: RootState) => state.todos.query;

export const selectIsLoading = (state: RootState) => state.todos.isLoading;

export const selectError = (state: RootState) => state.todos.error;

export const selectVisibleTodos = createSelector(
  [selectTodos, selectStatusFilter, selectQuery],
  (todos, filter, query) => {
    const searchQuery = query.trim().toLowerCase();

    return todos.filter(todo => {
      const todoText = todo.text.trim().toLowerCase();
      const isMatch = todoText.includes(searchQuery);

      switch (filter) {
        case FilterStatus.ACTIVE:
          return isMatch && !todo.completed;

        case FilterStatus.COMPLETED:
          return isMatch && todo.completed;

        default:
          return isMatch;
      }
    });
  }
);
