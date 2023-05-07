import { FC, useState } from 'react';
import {
  TbClock,
  TbCalendarTime,
  TbCheck,
  TbEdit,
  TbTrash,
} from 'react-icons/tb';

import { Todo } from 'types/todo';
import { useTypedSelector, useTypedDispatch } from 'hooks';
import { toggleCompleted, deleteTodo } from 'store/actions/todosActions';
import { getTodos } from 'store/selectors/todosSelectors';
import { TodoModal } from 'components/TodoModal';

import './TodoItem.scss';

type TodoItemProps = {
  item: Todo;
};

export const TodoItem: FC<TodoItemProps> = ({
  item: {
    id,
    text,
    completed,
    time: { start, end },
  },
}) => {
  const [modal, setModal] = useState(false);
  const [todo, setTodo] = useState<Todo | null>(null);
  const dispatch = useTypedDispatch();
  const todos = useTypedSelector(getTodos);

  const toggleCompletedHandler = (id: string) => dispatch(toggleCompleted(id));

  const deleteTodoHandler = (id: string) => dispatch(deleteTodo(id));

  const editTodoHandler = (id: string) => {
    const item = todos.find(({ id: todoId }: { id: string }) => todoId === id);
    if (item) setTodo(item);
    closeModalHandler();
  };

  const closeModalHandler = () => setModal(prevState => !prevState);

  return (
    <>
      <li className="todo">
        <label htmlFor={id}>
          <input
            id={id}
            type="checkbox"
            className="todo__input"
            checked={completed}
            onChange={() => toggleCompletedHandler(id)}
          />
          <span className="todo__checkbox">
            <TbCheck size={24} className="todo__icon" />
          </span>
        </label>
        <div className="todo__wrapper">
          <p className={completed ? 'todo__crossed-text' : 'todo__text'}>
            {text}
          </p>
          <p className="todo__date">
            <TbClock size={20} />
            <span className="date__descr">
              <b>Start: </b>
              {start}
            </span>
          </p>
          <p className="todo__date">
            <TbCalendarTime size={20} />
            <span className="date__descr">
              <b>Due to: </b>
              {end}
            </span>
          </p>
        </div>
        <div className="todo__button-wrapper">
          <button
            type="button"
            disabled={completed}
            className="edit-button"
            onClick={() => editTodoHandler(id)}
          >
            <TbEdit size={24} />
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={() => deleteTodoHandler(id)}
          >
            <TbTrash size={24} />
          </button>
        </div>
      </li>
      {modal && todo && (
        <TodoModal closeModal={closeModalHandler} todo={todo} />
      )}
    </>
  );
};
