import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getInputDate, getDate } from '../../helpers/dateFormatter';
import { addTodo } from '../../redux/todos/actions';

import css from './PlusForm.module.css';

// eslint-disable-next-line react/prop-types
export const PlusForm = ({ stateFn, clearFn, text }) => {
  const [form, setForm] = useState({
    text: text,
    start: '',
    end: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const start = new Date();
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    setForm(prevState => ({
      ...prevState,
      start: getInputDate(start),
      end: getInputDate(end),
    }));
  }, []);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const submitHandler = e => {
    e.preventDefault();

    dispatch(
      addTodo({
        text: form.text,
        start: getDate(new Date(form.start)),
        end: getDate(new Date(form.end)),
      })
    );

    setForm({ text: '', start: '', end: '' });

    stateFn();
    clearFn();
  };

  return (
    <form className={css.form} onSubmit={submitHandler} autoComplete="off">
      <div className={css.formField}>
        <label htmlFor="text">Task</label>
        <input
          id="text"
          type="text"
          name="text"
          value={form.text}
          pattern="^[A-Za-z0-9' ]+$"
          placeholder="Add a task"
          onChange={handleChange}
          className={css.formInput}
          title="Description may contain only letters, numbers and spaces."
          required
        />
      </div>
      <div className={css.formField}>
        <label htmlFor="start">Start date</label>
        <input
          id="start"
          type="datetime-local"
          min={getInputDate(new Date())}
          name="start"
          value={form.start}
          className={css.formInput}
          onChange={handleChange}
        />
      </div>
      <div className={css.formField}>
        <label htmlFor="end">Due date</label>
        <input
          id="end"
          type="datetime-local"
          name="end"
          value={form.end}
          className={css.formInput}
          onChange={handleChange}
        />
      </div>
      <div className={css.buttonWrapper}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button type="button" onClick={stateFn} className={css.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  );
};
