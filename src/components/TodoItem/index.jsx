import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TbClock,
  TbCalendarTime,
  TbCheck,
  TbEdit,
  TbTrash,
} from 'react-icons/tb';
import PropTypes from 'prop-types';

import { toggleCompleted, deleteTodo } from '../../redux/todos/actions';
import { getTodos } from '../../redux/todos/selectors';
import { TodoModal } from '../TodoModal';
import './TodoItem.scss';

export const TodoItem = ({
  item: {
    id,
    text,
    completed,
    time: { start, end },
  },
}) => {
  const [modal, setModal] = useState(false);
  const [todo, setTodo] = useState(null);
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);

  const toggleCompletedHandler = id => dispatch(toggleCompleted(id));

  const deleteTodoHandler = id => dispatch(deleteTodo(id));

  const editTodoHandler = id => {
    const item = todos.find(({ id: todoId }) => todoId === id);
    setTodo(item);
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
        <div className="button-wrapper">
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
      {modal && <TodoModal closeModal={closeModalHandler} todo={todo} />}
    </>
  );
};

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    time: PropTypes.exact({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
