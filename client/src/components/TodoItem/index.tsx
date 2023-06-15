import React, { FC, useState } from 'react';
import {
  TbClock,
  TbCalendarTime,
  TbCheck,
  TbEdit,
  TbTrash,
} from 'react-icons/tb';

import { TodoModal } from '@components/TodoModal';
import { useAppSelector, useAppDispatch } from '@hooks';
import { editTodo, deleteTodo } from '@store/todos/operations';
import { selectTodos } from '@store/todos/selectors';
import { Todo } from '@types';

import './TodoItem.scss';

type TodoItemProps = {
  item: Todo;
};

export const TodoItem: FC<TodoItemProps> = ({
  item: {
    _id,
    text,
    completed,
    time: { start, end },
  },
}) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);

  const [modal, setModal] = useState(false);
  const [todo, setTodo] = useState<Todo | null>(null);

  const toggleCompletedHandler = (_id: string) =>
    dispatch(editTodo({ _id, completed: !completed }));

  const deleteTodoHandler = (id: string) => dispatch(deleteTodo(id));

  const editTodoHandler = (id: string) => {
    const item = todos.find(({ _id }) => _id === id);
    if (item) setTodo(item);
    closeModalHandler();
  };

  const closeModalHandler = () => setModal(prevState => !prevState);

  return (
    <>
      <li className="todo">
        <label htmlFor={_id}>
          <input
            id={_id}
            type="checkbox"
            className="todo__input"
            checked={completed}
            onChange={() => toggleCompletedHandler(_id)}
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
            onClick={() => editTodoHandler(_id)}
          >
            <TbEdit size={24} />
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={() => deleteTodoHandler(_id)}
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
