import React, { useContext } from 'react';

import { ThemeContext } from './components/ThemeProvider';
import { ThemeToggler } from './components/ThemeToggler';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

export const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`theme-${theme}`}>
      <ThemeToggler />
      <TodoForm />
      <TodoList />
    </div>
  );
};
