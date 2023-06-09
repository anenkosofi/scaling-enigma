import { Todo, FilterStatus } from '@types';

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
    case FilterStatus.ACTIVE:
      return todos
        .filter(todo => todo.text.trim().toLowerCase().includes(searchQuery))
        .filter(todo => !todo.completed);

    case FilterStatus.COMPLETED:
      return todos
        .filter(todo => todo.text.trim().toLowerCase().includes(searchQuery))
        .filter(todo => todo.completed);

    default:
      return todos.filter(todo =>
        todo.text.trim().toLowerCase().includes(searchQuery)
      );
  }
};
