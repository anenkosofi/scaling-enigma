import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HiPlus } from 'react-icons/hi';

import { addTodo } from '../../redux/todos/actions';
import { getDate } from '../../helpers/dateFormatter';
import { Modal } from '../Modal';
import { PlusForm } from '../PlusForm';

import css from './TodoForm.module.css';

export const TodoForm = () => {
  const [modal, setModal] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const bodyEl = document.getElementById('body');

    bodyEl.style.overflow = modal ? 'hidden' : 'visible';
  }, [modal]);

  const changeHandler = e => {
    setText(e.currentTarget.value);
  };

  const submitHandler = e => {
    e.preventDefault();

    const start = new Date();
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    dispatch(addTodo({ text: text, start: getDate(start), end: getDate(end) }));

    setText('');
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
          <label htmlFor="text" className={css.formLabel}>
            Add a task
          </label>
          <input
            id="text"
            type="text"
            name="text"
            value={text}
            pattern="^[A-Za-z0-9' ]+$"
            placeholder="Add a task"
            onChange={changeHandler}
            className={css.formInput}
            title="Description may contain only letters, numbers and spaces."
            required
          />
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
