import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

import { getTodos } from '../../redux/todos/selectors';
import { getStatusFilter } from '../../redux/filters/selectors';
import { statusFilters } from '../../redux/filters/constants';
import { clearCompleted } from '../../redux/todos/actions';
import { Container } from '../Container';
import { StatusFilter } from '../StatusFilter';
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
  const [message, setMessage] = useState(
    'You do not have any task to do. Add the first!'
  );
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const statusFilter = useSelector(getStatusFilter);
  const visibleTodos = getVisibleTodos(todos, statusFilter);
  const areAnyTasksCompleted = todos.some(todo => todo.completed);

  const clearCompletedHandler = () => {
    dispatch(clearCompleted());
    toast.success('All completed tasks have been deleted!', {
      style: {
        fontSize: 16,
        color: '#23262a',
      },
      iconTheme: {
        primary: '#8baa36',
        secondary: '#fafafa',
      },
    });
  };

  useEffect(() => {
    const setNotification = () => {
      switch (statusFilter) {
        case statusFilters.active:
          return setMessage('You do not have active tasks at the moment.');

        case statusFilters.completed:
          return setMessage('You do not have completed tasks at the moment.');

        default:
          return setMessage('You do not have any task to do. Add the first!');
      }
    };
    setNotification();
  }, [statusFilter]);

  return (
    <section className="todo-list__section">
      <Toaster />
      <Container>
        <h1 className="todo-list__title">Tasks</h1>
        <div className="todo-list__button-wrapper">
          <StatusFilter />
          <button
            type="button"
            disabled={!areAnyTasksCompleted}
            className="clear-button"
            onClick={clearCompletedHandler}
          >
            Clear completed
          </button>
        </div>
        {visibleTodos.length ? (
          <ul className="todo-list">
            {visibleTodos.map(todo => (
              <TodoItem key={todo.id} item={todo} />
            ))}
          </ul>
        ) : (
          <p className="todo-list__notification">{message}</p>
        )}
      </Container>
    </section>
  );
};
