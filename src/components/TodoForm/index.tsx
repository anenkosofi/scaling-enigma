import React, { FC, useState, useEffect } from 'react';
import { HiPlus } from 'react-icons/hi';

import { FilterStatuses } from 'types/filters';
import { setStatusFilter } from 'store/actions/filtersActions';
import { addTodo } from 'store/actions/todosActions';
import { useTypedDispatch } from 'hooks/useTypedDispatch';
import {
  getFormattedDate,
  getInitialDates,
  validateSymbols,
  validateTextLength,
} from 'helpers';
import { Container } from 'components/Container';
import { TodoModal } from 'components/TodoModal';

import './TodoForm.scss';

export const TodoForm: FC = () => {
  const [modal, setModal] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const bodyEl = document.getElementById('body') as HTMLElement;

    bodyEl.style.overflow = modal ? 'hidden' : 'visible';
  }, [modal]);

  useEffect(() => {
    setError(validateSymbols(text));
  }, [text]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const lengthError = validateTextLength(text);
    setError(lengthError);
    if (lengthError) return;

    const symbolsError = validateSymbols(text);
    setError(symbolsError);
    if (symbolsError) return;

    const [start, end] = getInitialDates();

    dispatch(
      addTodo({
        text: text,
        time: {
          start: getFormattedDate(start),
          end: getFormattedDate(end),
        },
      })
    );
    dispatch(setStatusFilter(FilterStatuses.ALL));
    clearInputHandler();
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const closeModalHandler = () => {
    setModal(prevState => !prevState);
  };

  const clearInputHandler = () => {
    setText('');
  };

  return (
    <section className="todo-form__section">
      <Container>
        <div className="todo-form__container">
          <form
            className="todo-form"
            onSubmit={submitHandler}
            autoComplete="off"
          >
            <div className="todo-form__field">
              <label htmlFor="text" className="todo-form__label">
                Add a task
              </label>
              <input
                id="text"
                type="text"
                name="text"
                value={text}
                placeholder="Add a task"
                onChange={changeHandler}
                className="todo-form__input"
                title="Description may contain only letters, numbers and spaces."
              />
              {error !== null && <p className="error-message">{error}</p>}
            </div>
            <button type="submit" className="todo-form__button">
              Add
            </button>
          </form>
          <button
            type="button"
            className="add-button"
            onClick={closeModalHandler}
          >
            <HiPlus size={24} />
          </button>
        </div>
      </Container>
      {modal && (
        <TodoModal
          closeModal={closeModalHandler}
          clearInput={clearInputHandler}
          todo={{ text: text }}
        />
      )}
    </section>
  );
};
