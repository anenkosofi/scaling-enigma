import { statusFilters } from '../redux/filters/constants';

export const getVisibleTodos = (todos, statusFilter) => {
  switch (statusFilter) {
    case statusFilters.active:
      return todos.filter(todo => !todo.completed);

    case statusFilters.completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};
