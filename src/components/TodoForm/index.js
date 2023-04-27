import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HiPlus } from 'react-icons/hi';

import { addTodo } from '../../redux/todos/actions';
import { getFormattedDate } from '../../helpers/dateFormatter';
import { Modal } from '../Modal';
import { PlusForm } from '../PlusForm';

import css from './TodoForm.module.css';

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
    const regex = /^[a-zA-Z0-9\s\u0400-\u04FF']*$/;
    if (!regex.test(text)) {
      return setError('Special symbols like !@#$%^&*()_+= are not allowed.');
    }
    return setError(null);
  }, [text]);

  const submitHandler = e => {
    e.preventDefault();

    if (!text.trim().length) {
      return setError('This field can not be empty.');
    }
    if (!error) {
      const start = new Date();
      const end = new Date(start);
      end.setDate(end.getDate() + 1);

      dispatch(
        addTodo({
          text: text,
          start: getFormattedDate(start),
          end: getFormattedDate(end),
        })
      );

      setText('');
    }
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
    <section className={css.section}>
      <div className={css.container}>
        <form className={css.form} onSubmit={submitHandler} autoComplete="off">
          <div className={css.field}>
            <label htmlFor="text" className={css.formLabel}>
              Add a task
            </label>
            <input
              id="text"
              type="text"
              name="text"
              value={text}
              placeholder="Add a task"
              onChange={changeHandler}
              className={css.formInput}
              title="Description may contain only letters, numbers and spaces."
            />
            {error !== null && <p className={css.errorMessage}>{error}</p>}
          </div>
          <button type="submit" className={css.formButton}>
            Add
          </button>
        </form>
        <button
          type="button"
          className={css.addButton}
          onClick={closeModalHandler}
        >
          <HiPlus size={24} />
        </button>
      </div>
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
