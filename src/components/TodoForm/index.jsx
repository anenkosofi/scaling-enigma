import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HiPlus } from 'react-icons/hi';

import { addTodo } from '../../redux/todos/actions';
import { getFormattedDate } from '../../helpers/formatDate';
import { getInitialDates } from '../../helpers/getInitialDates';
import {
  validateSymbols,
  validateTextLength,
} from '../../helpers/validateInputs';
import { Container } from '../Container';
import { Modal } from '../Modal';
import { PlusForm } from '../PlusForm';

import './TodoForm.scss';

export const TodoForm = () => {
  const [modal, setModal] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const bodyEl = document.getElementById('body');

    bodyEl.style.overflow = modal ? 'hidden' : 'visible';
  }, [modal]);

  useEffect(() => {
    setError(validateSymbols(text));
  }, [text]);

  const submitHandler = e => {
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
        start: getFormattedDate(start),
        end: getFormattedDate(end),
      })
    );

    setText('');
  };

  const changeHandler = e => {
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
        <Modal stateFn={closeModalHandler}>
          <PlusForm
            text={text}
            stateFn={closeModalHandler}
            clearFn={clearInputHandler}
          />
        </Modal>
      )}
    </section>
  );
};
