import React, { FC, useContext, useEffect } from 'react';

import { Header } from '@components/Header';
import { ThemeContext } from '@components/ThemeProvider';
import { TodoForm } from '@components/TodoForm';
import { TodoList } from '@components/TodoList';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectQuery, selectStatusFilter } from '@store/filters/selectors';
import { getTodos } from '@store/todos/operations';

const TodosPage: FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);
  const query = useAppSelector(selectQuery);
  const status = useAppSelector(selectStatusFilter);

  useEffect(() => {
    dispatch(getTodos());
  }, [query, status]);

  return (
    <div className={`theme-${theme}`}>
      <Header />
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default TodosPage;
