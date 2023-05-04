import { FC, useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getTodos } from '../../store/selectors/todosSelectors';
import { getStatusFilter } from '../../store/selectors/filtersSelector';
import { clearCompleted } from '../../store/actions/todosActions';
import { getVisibleTodos } from '../../helpers/getVisibleTodos';
import { getMessage } from '../../helpers/setMessage';
import { Container } from '../Container';
import { SearchForm } from '../SearchForm';
import { StatusFilter } from '../StatusFilter';
import { TodoItem } from '../TodoItem';

import './TodoList.scss';

export const TodoList: FC = () => {
  const [message, setMessage] = useState(
    'You do not have any task to do. Add the first!'
  );
  const [query, setQuery] = useState('');
  const dispatch = useTypedDispatch();
  const todos = useTypedSelector(getTodos);
  const statusFilter = useTypedSelector(getStatusFilter);
  const visibleTodos = getVisibleTodos({ todos, statusFilter, query });
  const areAnyTasksCompleted = todos.some(todo => todo.completed);

  const clearCompletedHandler = () => {
    dispatch(clearCompleted());
    toast.success('All completed tasks have been deleted!', {
      style: {
        fontSize: 16,
        color: '#23262a',
      },
      iconTheme: {
        primary: '#8baa36',
        secondary: '#fafafa',
      },
    });
  };

  useEffect(() => {
    const message = getMessage(statusFilter, query);
    setMessage(message);
  }, [statusFilter, query]);

  const getQuery = (query: string) => setQuery(query);

  return (
    <section className="todo-list__section">
      <Toaster />
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
              <TodoItem key={todo.id} item={todo} />
            ))}
          </ul>
        ) : (
          <p className="todo-list__notification">{message}</p>
        )}
      </Container>
    </section>
  );
};