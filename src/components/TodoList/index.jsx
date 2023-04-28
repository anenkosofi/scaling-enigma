import { useSelector } from 'react-redux';

import { getTodos } from '../../redux/todos/selectors';
import { Container } from '../Container';
import { TodoItem } from '../TodoItem';

import './TodoList.scss';

export const TodoList = () => {
  const todos = useSelector(getTodos);

  return (
    <section className="todoListSection">
      <Container>
        <h1 className="todoList-title">Tasks</h1>
        {todos.length ? (
          <ul className="todoList">
            {todos.map(todo => (
              <TodoItem key={todo.id} item={todo} />
            ))}
          </ul>
        ) : (
          <p className="todoList__notification">
            You do not have any task to do. Add the first one!
          </p>
        )}
      </Container>
    </section>
  );
};
