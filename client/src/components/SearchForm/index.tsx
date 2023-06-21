import React, { FC, useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '@hooks';
import { selectQuery } from '@store/filters/selectors';
import { setQuery } from '@store/filters/slice';

import './SearchForm.scss';

export const SearchForm: FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectQuery);

  const [queryValue, setQueryValue] = useState(query);

  useEffect(() => {
    const value = queryValue.trim().toLowerCase();
    if (value !== query) {
      dispatch(setQuery(value));
    }
  }, [queryValue]);

  const getQueryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setQueryValue(value);
  };

  const resetHandler: React.MouseEventHandler<HTMLButtonElement> = () =>
    setQueryValue('');

  return (
    <div className="search-form">
      <div className="search-form__field">
        <label htmlFor="query" className="search-form__label">
          Enter task text
        </label>
        <input
          id="query"
          type="text"
          name="query"
          value={queryValue}
          placeholder="Enter a task text..."
          onChange={getQueryHandler}
          className="search-form__input"
          autoComplete="off"
        />
        <button
          type="button"
          className="search-form__button"
          onClick={resetHandler}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
