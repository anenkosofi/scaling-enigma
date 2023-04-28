import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { getInputDate, getFormattedDate } from '../../helpers/formatDate';
import {
  validateValues,
  validateTextLength,
} from '../../helpers/validateInputs';
import { getInitialDates } from '../../helpers/getInitialDates';
import { addTodo } from '../../redux/todos/actions';

import './PlusForm.scss';

export const PlusForm = ({ stateFn, clearFn, text }) => {
  const [form, setForm] = useState({
    text: text,
    start: getInputDate(getInitialDates()[0]),
    end: getInputDate(getInitialDates()[1]),
  });
  const [error, setError] = useState({ text: null, start: null, end: null });
  const dispatch = useDispatch();

  useEffect(() => {
    const errors = validateValues({
      text: form.text,
      start: form.start,
      end: form.end,
    });

    setError(errors);
  }, [form.text, form.start, form.end]);

  const changeHandler = e => {
    const { name, value } = e.currentTarget;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const submitHandler = e => {
    e.preventDefault();

    const textError = validateTextLength(form.text);
    setError(prevState => ({ ...prevState, text: textError }));

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
    <form className="Form" onSubmit={submitHandler} autoComplete="off">
      <div className="FormField">
        <label htmlFor="text" className="FormLabel">
          Add a task
        </label>
        <input
          id="text"
          type="text"
          name="text"
          value={form.text}
          placeholder="Add a task"
          onChange={changeHandler}
          className="FormInput"
          title="Description may contain only letters, numbers and spaces."
        />
        {error.text !== null && <p className="ErrorMessage">{error.text}</p>}
      </div>
      <div className="FormField">
        <label htmlFor="start">Start date</label>
        <input
          id="start"
          type="datetime-local"
          name="start"
          value={form.start}
          className="FormInput"
          onChange={changeHandler}
        />
        {error.start !== null && <p className="ErrorMessage">{error.start}</p>}
      </div>
      <div className="FormField">
        <label htmlFor="end">Due date</label>
        <input
          id="end"
          type="datetime-local"
          name="end"
          value={form.end}
          className="FormInput"
          onChange={changeHandler}
        />
        {error.end !== null && <p className="ErrorMessage">{error.end}</p>}
      </div>
      <div className="ButtonWrapper">
        <button type="submit" className="SaveButton">
          Save
        </button>
        <button type="button" onClick={stateFn} className="CancelButton">
          Cancel
        </button>
      </div>
    </form>
  );
};

PlusForm.propTypes = {
  stateFn: PropTypes.func.isRequired,
  clearFn: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
