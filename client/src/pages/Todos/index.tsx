import React, { FC, useContext, useEffect } from 'react';

import { Header } from '@components/Header';
import { Pagination } from '@components/Pagination';
import { ThemeContext } from '@components/ThemeProvider';
import { TodoForm } from '@components/TodoForm';
import { TodoList } from '@components/TodoList';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
  selectQuery,
  selectStatusFilter,
  selectPage,
} from '@store/filters/selectors';
import { getTodos } from '@store/todos/operations';

const TodosPage: FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);
  const query = useAppSelector(selectQuery);
  const status = useAppSelector(selectStatusFilter);
  const page = useAppSelector(selectPage);

  useEffect(() => {
    dispatch(getTodos());
  }, [query, status, page]);

  return (
    <div className={`theme-${theme}`}>
      <Header />
      <TodoForm />
      <TodoList />
      <Pagination />
    </div>
  );
};

export default TodosPage;
