import { useSelector } from 'react-redux';

import { getTodos } from '../../redux/todos/selectors';
import { getStatusFilter } from '../../redux/filters/selectors';
import { statusFilters } from '../../redux/filters/constants';
import { Container } from '../Container';
import { TodoItem } from '../TodoItem';

import './TodoList.scss';

const getVisibleTodos = (todos, statusFilter) => {
  switch (statusFilter) {
    case statusFilters.active:
      return todos.filter(todo => !todo.completed);

    case statusFilters.completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};

export const TodoList = () => {
  const todos = useSelector(getTodos);
  const statusFilter = useSelector(getStatusFilter);
  const visibleTodos = getVisibleTodos(todos, statusFilter);

  return (
    <section className="todo-list__section">
      <Container>
        <h1 className="todo-list__title">Tasks</h1>
        {todos.length ? (
          <ul className="todo-list">
            {visibleTodos.map(todo => (
              <TodoItem key={todo.id} item={todo} />
            ))}
          </ul>
        ) : (
          <p className="todo-list__notification">
            You do not have any task to do. Add the first!
          </p>
        )}
      </Container>
    </section>
  );
};
