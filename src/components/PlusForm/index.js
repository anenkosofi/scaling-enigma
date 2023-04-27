import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getInputDate, getFormattedDate } from '../../helpers/dateFormatter';
import { addTodo } from '../../redux/todos/actions';

import css from './PlusForm.module.css';

// eslint-disable-next-line react/prop-types
export const PlusForm = ({ stateFn, clearFn, text }) => {
  const [form, setForm] = useState({
    text: text,
    start: '',
    end: '',
  });
  const [error, setError] = useState({ text: null, start: null, end: null });
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

  useEffect(() => {
    const errors = { text: null, start: null, end: null };

    const regex = /^[a-zA-Z0-9\s\u0400-\u04FF']*$/;
    if (!regex.test(form.text)) {
      errors.text = 'Special symbols like !@#$%^&*()_+= are not allowed.';
    }

    if (!isNaN(form.start)) {
      errors.start = 'This field is required.';
    }
    if (!isNaN(form.end)) {
      errors.end = 'This field is required.';
    }

    const [startYear] = form.start.split('-');
    const [endYear] = form.end.split('-');

    if (parseInt(startYear) > 9999) {
      errors.start = 'Invalid date value.';
    }
    if (parseInt(endYear) > 9999) {
      errors.end = 'Invalid date value.';
    }

    const startDate = new Date(form.start);
    const endDate = new Date(form.end);

    if (startDate.getTime() === endDate.getTime()) {
      errors.start = 'Dates can not be the same.';
    }
    if (startDate.getTime() > endDate.getTime()) {
      errors.start = 'Start date can not be greater than end date.';
    }

    setError(errors);
  }, [form.text, form.start, form.end]);

  const changeHandler = e => {
    const { name, value } = e.currentTarget;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const submitHandler = e => {
    e.preventDefault();

    if (!form.text.trim().length) {
      return setError(prevState => ({
        ...prevState,
        text: 'This field can not be empty.',
      }));
    }

    if (Object.values(error).every(value => !value)) {
      dispatch(
        addTodo({
          text: form.text,
          start: getFormattedDate(new Date(form.start)),
          end: getFormattedDate(new Date(form.end)),
        })
      );

      setForm({ text: '', start: '', end: '' });

      stateFn();
      clearFn();
    }
  };

  return (
    <form className={css.form} onSubmit={submitHandler} autoComplete="off">
      <div className={css.formField}>
        <label htmlFor="text" className={css.formLabel}>
          Add a task
        </label>
        <input
          id="text"
          type="text"
          name="text"
          value={form.text}
          placeholder="Add a task"
          onChange={changeHandler}
          className={css.formInput}
          title="Description may contain only letters, numbers and spaces."
        />
        {error.text !== null && (
          <p className={css.errorMessage}>{error.text}</p>
        )}
      </div>
      <div className={css.formField}>
        <label htmlFor="start">Start date</label>
        <input
          id="start"
          type="datetime-local"
          name="start"
          value={form.start}
          className={css.formInput}
          onChange={changeHandler}
        />
        {error.start !== null && (
          <p className={css.errorMessage}>{error.start}</p>
        )}
      </div>
      <div className={css.formField}>
        <label htmlFor="end">Due date</label>
        <input
          id="end"
          type="datetime-local"
          name="end"
          value={form.end}
          className={css.formInput}
          onChange={changeHandler}
        />
        {error.end !== null && <p className={css.errorMessage}>{error.end}</p>}
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
