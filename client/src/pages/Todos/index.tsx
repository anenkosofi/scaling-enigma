import React, { FC, useContext, useEffect } from 'react';

import { Header } from '@components/Header';
import { ThemeContext } from '@components/ThemeProvider';
import { TodoForm } from '@components/TodoForm';
import { TodoList } from '@components/TodoList';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectQuery, selectStatusFilter } from '@store/filters/selectors';
import { getTodos } from '@store/todos/operations';
import { selectTodos } from '@store/todos/selectors';

const TodosPage: FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);
  const todos = useAppSelector(selectTodos);
  const query = useAppSelector(selectQuery);
  const status = useAppSelector(selectStatusFilter);

  const completedTasks = todos.filter(todo => todo.completed);

  useEffect(() => {
    dispatch(getTodos());
  }, [query, status, completedTasks.length]);

  return (
    <div className={`theme-${theme}`}>
      <Header />
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default TodosPage;
