import { useState, useEffect } from 'react';

import { getInputDate } from '../../helpers/dateFormatter';

import css from './PlusForm.module.css';

// eslint-disable-next-line react/prop-types
export const PlusForm = ({ stateFn, onGetInfo }) => {
  const [form, setForm] = useState({
    title: '',
    start: '',
    end: '',
  });

  useEffect(() => {
    const start = new Date();
    const end = start;
    end.setDate(start.getDate() + 1);

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

    onGetInfo(form);

    e.target.reset();

    stateFn();
  };

  return (
    <form className={css.form} onSubmit={submitHandler} autoComplete="off">
      <div className={css.formField}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={form.title}
          placeholder="Add a title"
          className={css.formInput}
          onChange={handleChange}
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
