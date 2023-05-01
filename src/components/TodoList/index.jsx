import { useSelector } from 'react-redux';

import { getTodos } from '../../redux/todos/selectors';
import { Container } from '../Container';
import { TodoItem } from '../TodoItem';

import './TodoList.scss';

export const TodoList = () => {
  const todos = useSelector(getTodos);

  return (
    <section className="todo-list__section">
      <Container>
        <h1 className="todo-list__title">Tasks</h1>
        {todos.length ? (
          <ul className="todo-list">
            {todos.map(todo => (
              <TodoItem key={todo.id} item={todo} />
            ))}
          </ul>
        ) : (
          <p className="todo-list__notification">
            You do not have any task to do. Add the first one!
          </p>
        )}
      </Container>
    </section>
  );
};
