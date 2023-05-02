import { TodoForm } from './TodoForm';
import { StatusFilter } from './StatusFilter';
import { TodoList } from './TodoList';

export const App = () => {
  return (
    <>
      <TodoForm />
      <StatusFilter />
      <TodoList />
    </>
  );
};
