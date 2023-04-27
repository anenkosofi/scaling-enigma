import { useSelector } from 'react-redux';

import { getTodos } from '../../redux/todos/selectors';
import { TodoItem } from '../TodoItem';

import css from './TodoList.module.css';

export const TodoList = () => {
  const todos = useSelector(getTodos);

  return (
    <section className={css.section}>
      <div className={css.container}>
        <h1 className={css.todosTitle}>Tasks</h1>
        {todos.length > 0 ? (
          <ul className={css.todoList}>
            {todos.map(todo => (
              <TodoItem key={todo.id} item={todo} />
            ))}
          </ul>
        ) : (
          <p className={css.notification}>
            You do not have any task to do. Add the first one!
          </p>
        )}
      </div>
    </section>
  );
};
