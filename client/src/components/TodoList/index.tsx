import React, { FC, useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Container } from '@components/Container';
import { SearchForm } from '@components/SearchForm';
import { StatusFilter } from '@components/StatusFilter';
import { TodoItem } from '@components/TodoItem';
import { useAppSelector, useAppDispatch } from '@hooks';
import { selectStatusFilter } from '@store/filters/selectors';
import { selectTodos } from '@store/todos/selectors';
import { clearCompleted } from '@store/todos/slice';
import { getVisibleTodos, getMessage } from '@utils';

import './TodoList.scss';

export const TodoList: FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);
  const statusFilter = useAppSelector(selectStatusFilter);

  const areAnyTasksCompleted = todos.some(todo => todo.completed);

  const [message, setMessage] = useState(
    'You do not have any task to do. Add the first!'
  );
  const [query, setQuery] = useState('');

  const visibleTodos = getVisibleTodos({ todos, statusFilter, query });

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
    const message = getMessage(statusFilter, query);
    setMessage(message);
  }, [statusFilter, query]);

  const getQuery = (query: string) => setQuery(query);

  return (
    <section className="todo-list__section">
      <Toaster />
      <Container>
        <h1 className="todo-list__title">Tasks</h1>
        <SearchForm onGetQuery={getQuery} />
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
