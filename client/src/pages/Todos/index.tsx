import React, { FC, useContext, useEffect } from 'react';

import { Header } from '@components/Header';
import { ThemeContext } from '@components/ThemeProvider';
import { TodoForm } from '@components/TodoForm';
import { TodoList } from '@components/TodoList';
import { useAppDispatch } from '@hooks';
import { getTodos } from '@store/todos/operations';

const TodosPage: FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  return (
    <div className={`theme-${theme}`}>
      <Header />
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default TodosPage;
