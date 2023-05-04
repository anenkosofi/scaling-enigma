import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { setStatusFilter } from '../../redux/filters/actions';
import { statusFilters } from '../../redux/filters/constants';
import {
  getInputDate,
  getFormattedDate,
  getOriginalDate,
} from '../../helpers/formatDate';
import {
  validateValues,
  validateTextLength,
} from '../../helpers/validateInputs';
import { getInitialDates } from '../../helpers/getInitialDates';
import { addTodo, editTodo } from '../../redux/todos/actions';

import './EditForm.scss';

export const EditForm = ({
  closeModal,
  clearInput,
  todo: { id, text, time },
}) => {
  const [form, setForm] = useState({
    text: text,
    start: time?.start
      ? getInputDate(getOriginalDate(time.start))
      : getInputDate(getInitialDates()[0]),
    end: time?.end
      ? getInputDate(getOriginalDate(time.end))
      : getInputDate(getInitialDates()[1]),
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
    if (textError) return;

    const errors = validateValues({
      text: form.text,
      start: form.start,
      end: form.end,
    });
    setError(errors);
    if (Object.values(errors).some(value => value)) return;

    const newTodo = {
      text: form.text,
      start: getFormattedDate(new Date(form.start)),
      end: getFormattedDate(new Date(form.end)),
    };

    if (!id) {
      dispatch(addTodo(newTodo));

      dispatch(setStatusFilter(statusFilters.all));
      clearInput();
    } else {
      dispatch(editTodo(id, newTodo));
    }

    setForm({ text: '', start: '', end: '' });

    closeModal();
  };

  return (
    <form className="form" onSubmit={submitHandler} autoComplete="off">
      <div className="form__field">
        <label htmlFor="text">Add a task</label>
        <input
          id="text"
          type="text"
          name="text"
          value={form.text}
          placeholder="Add a task"
          onChange={changeHandler}
          className="form__input"
          title="Description may contain only letters, numbers and spaces."
        />
        {error.text !== null && <p className="error-message">{error.text}</p>}
      </div>
      <div className="form__field">
        <label htmlFor="start">Start date</label>
        <input
          id="start"
          type="datetime-local"
          name="start"
          value={form.start}
          className="form__input"
          onChange={changeHandler}
        />
        {error.start !== null && <p className="error-message">{error.start}</p>}
      </div>
      <div className="form__field">
        <label htmlFor="end">Due date</label>
        <input
          id="end"
          type="datetime-local"
          name="end"
          value={form.end}
          className="form__input"
          onChange={changeHandler}
        />
        {error.end !== null && <p className="error-message">{error.end}</p>}
      </div>
      <div className="button-wrapper">
        <button type="submit" className="save-button">
          Save
        </button>
        <button type="button" onClick={closeModal} className="cancel-button">
          Cancel
        </button>
      </div>
    </form>
  );
};

EditForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  clearInput: PropTypes.func,
  todo: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string.isRequired,
    time: PropTypes.exact({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
