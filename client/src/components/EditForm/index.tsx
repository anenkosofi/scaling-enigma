import React, { FC, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import { todoModalInputs } from '@constants';
import { addTodo } from '@store/todos/operations';
import { selectError, selectIsLoading } from '@store/todos/selectors';
import { FilterStatus } from '@types';
import {
  getInputDate,
  getFormattedDate,
  getOriginalDate,
  validateValues,
  validateTextLength,
  getInitialDates,
} from '@utils';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setFilterStatus, setPage } from 'store/filters/slice';
import { editTodo } from 'store/todos/operations';

import './EditForm.scss';

type EditFormProps = {
  closeModal: () => void;
  todo: {
    text: string;
    _id?: string;
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
  todo: { _id, text, time },
}) => {
  const dispatch = useAppDispatch();
  const todoError = useAppSelector(selectError);
  const isLoading = useAppSelector(selectIsLoading);

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
      completed: false,
      time: {
        start,
        end,
      },
    };

    if (!_id) {
      dispatch(addTodo(newTodo));
      dispatch(setFilterStatus(FilterStatus.ALL));
      dispatch(setPage(1));
      clearInput?.();
    } else {
      const updatedTodo = {
        _id,
        text,
        time: {
          start,
          end,
        },
      };
      dispatch(editTodo(updatedTodo));
      if (!isLoading && !todoError) {
        toast.success('Todo updated successfully!');
      }
    }

    setForm({ text: '', start: '', end: '' });

    closeModal();
  };

  return (
    <form className="form" onSubmit={submitHandler} autoComplete="off">
      {todoModalInputs.map(({ label, id, type, name, placeholder }) => (
        <div className="form__field" key={id}>
          <label htmlFor={id}>{label}</label>
          <input
            id={id}
            type={type}
            name={name}
            value={form[name as keyof typeof form]}
            {...(placeholder && { placeholder })}
            onChange={changeHandler}
            className="form__input"
          />
          {error[name as keyof typeof error] && (
            <p className="error-message">{error[name as keyof typeof error]}</p>
          )}
        </div>
      ))}
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
