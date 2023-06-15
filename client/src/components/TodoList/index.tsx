import React, { FC, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import { Container } from '@components/Container';
import { SearchForm } from '@components/SearchForm';
import { StatusFilter } from '@components/StatusFilter';
import { TodoItem } from '@components/TodoItem';
import { useAppSelector, useAppDispatch } from '@hooks';
import { selectStatusFilter } from '@store/filters/selectors';
import { deleteCompleted } from '@store/todos/operations';
import {
  selectError,
  selectIsLoading,
  selectTodos,
  selectVisibleTodos,
  selectQuery,
} from '@store/todos/selectors';
import { setQuery } from '@store/todos/slice';
import { Colors } from '@types';
import { getMessage } from '@utils';

import './TodoList.scss';

export const TodoList: FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);
  const query = useAppSelector(selectQuery);
  const statusFilter = useAppSelector(selectStatusFilter);
  const visibleTodos = useAppSelector(selectVisibleTodos);
  const error = useAppSelector(selectError);
  const isLoading = useAppSelector(selectIsLoading);

  const areAnyTasksCompleted = todos.some(todo => todo.completed);

  const [message, setMessage] = useState(
    'You do not have any task to do. Add the first!'
  );

  const clearCompletedHandler = () => {
    dispatch(deleteCompleted());
    if (!isLoading && !error) {
      toast.success('All completed tasks have been deleted!', {
        style: {
          fontSize: 16,
          color: Colors.DARK,
        },
        iconTheme: {
          primary: Colors.GREEN,
          secondary: Colors.LIGHT,
        },
      });
    }
  };

  useEffect(() => {
    const message = getMessage(statusFilter, query);
    setMessage(message);
  }, [statusFilter, query]);

  const getQuery = (query: string) => dispatch(setQuery(query));

  return (
    <section className="todo-list__section">
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
              <TodoItem key={todo._id} item={todo} />
            ))}
          </ul>
        ) : (
          <p className="todo-list__notification">{message}</p>
        )}
      </Container>
    </section>
  );
};
