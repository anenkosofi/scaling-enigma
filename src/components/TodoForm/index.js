import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { HiPlus } from 'react-icons/hi';

import { addTodo } from '../../redux/todos/actions';
import { getDate } from '../../helpers/dateFormatter';
import { Modal } from '../Modal';
import { PlusForm } from '../PlusForm';

import css from './TodoForm.module.css';

export const TodoForm = () => {
  const [modal, setModal] = useState(false);
  const [information, setInformation] = useState(null);
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();

    const form = e.target;

    const description = form.elements.description.value;

    if (!information) {
      const start = new Date();
      const end = start;
      end.setDate(start.getDate() + 1);

      dispatch(
        addTodo({ description, start: getDate(start), end: getDate(end) })
      );
    } else {
      const { title, start, end } = information;
      dispatch(
        addTodo({
          description,
          title,
          start: getDate(new Date(start)),
          end: getDate(new Date(end)),
        })
      );
    }

    form.reset();
  };

  const closeModalHandler = () => {
    setModal(prevState => !prevState);
  };

  const getInfo = info => {
    setInformation(info);
  };

  return (
    <>
      <div className={css.container}>
        <form className={css.form} onSubmit={submitHandler} autoComplete="off">
          <label htmlFor="description" className={css.formLabel}>
            Add a task
          </label>
          <input
            id="description"
            type="text"
            name="description"
            pattern="^[A-Za-z0-9' ]+$"
            placeholder="Add a task"
            className={css.formInput}
            title="Description may contain only letters, numbers and spaces."
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
          <PlusForm stateFn={closeModalHandler} onGetInfo={getInfo} />
        </Modal>
      )}
    </>
  );
};
