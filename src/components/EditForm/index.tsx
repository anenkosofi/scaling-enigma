import React, { FC, useState, useEffect } from 'react';

import { setStatusFilter } from 'store/actions/filtersActions';
import { addTodo, editTodo } from 'store/actions/todosActions';
import { FilterStatuses } from 'types/filters';
import {
  getInputDate,
  getFormattedDate,
  getOriginalDate,
  validateValues,
  validateTextLength,
  getInitialDates,
} from 'helpers';
import { useTypedDispatch } from 'hooks';

import './EditForm.scss';

type EditFormProps = {
  closeModal: () => void;
  todo: {
    id?: string;
    text: string;
    time?: {
      start?: string;
      end?: string;
    };
  };
  clearInput?: () => void;
};

type ErrorState = {
  text: string | null;
  start: string | null;
  end: string | null;
};

export const EditForm: FC<EditFormProps> = ({
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
  const [error, setError] = useState<ErrorState>({
    text: null,
    start: null,
    end: null,
  });
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const errors = validateValues({
      text: form.text,
      start: form.start,
      end: form.end,
    });

    setError(errors);
  }, [form.text, form.start, form.end]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
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

    const text = form.text;
    const start = getFormattedDate(new Date(form.start));
    const end = getFormattedDate(new Date(form.end));

    const newTodo = {
      text,
      time: {
        start,
        end,
      },
    };

    if (!id) {
      dispatch(addTodo(newTodo));

      dispatch(setStatusFilter(FilterStatuses.ALL));
      clearInput?.();
    } else {
      const updatedTodo = {
        id,
        text,
        time: {
          start,
          end,
        },
      };
      dispatch(editTodo(updatedTodo));
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
