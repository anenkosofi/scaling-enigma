import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './SearchForm.scss';

export const SearchForm = ({ onGetQuery }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    onGetQuery(query);
  }, [onGetQuery, query]);

  const getQueryHandler = e => {
    const { value } = e.currentTarget;
    setQuery(value);
  };

  const resetHandler = () => setQuery('');

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
          value={query}
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

SearchForm.propTypes = {
  onGetQuery: PropTypes.func.isRequired,
};
