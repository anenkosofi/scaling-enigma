import { FilterStatuses } from '../types/filters';
import { Todo } from '../types/todo';

export const getVisibleTodos = ({
  todos,
  statusFilter,
  query,
}: {
  todos: Todo[];
  statusFilter: string;
  query: string;
}) => {
  const searchQuery = query.trim().toLowerCase();
  switch (statusFilter) {
    case FilterStatuses.ACTIVE:
      return todos
        .filter(todo => todo.text.trim().toLowerCase().includes(searchQuery))
        .filter(todo => !todo.completed);

    case FilterStatuses.COMPLETED:
      return todos
        .filter(todo => todo.text.trim().toLowerCase().includes(searchQuery))
        .filter(todo => todo.completed);

    default:
      return todos.filter(todo =>
        todo.text.trim().toLowerCase().includes(searchQuery)
      );
  }
};
