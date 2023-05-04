import { statusFilters } from '../redux/filters/constants';

export const getVisibleTodos = ({ todos, statusFilter, query }) => {
  const searchQuery = query.trim().toLowerCase();
  switch (statusFilter) {
    case statusFilters.active:
      return todos
        .filter(todo => todo.text.trim().toLowerCase().includes(searchQuery))
        .filter(todo => !todo.completed);

    case statusFilters.completed:
      return todos
        .filter(todo => todo.text.trim().toLowerCase().includes(searchQuery))
        .filter(todo => todo.completed);

    default:
      return todos.filter(todo =>
        todo.text.trim().toLowerCase().includes(searchQuery)
      );
  }
};
