import React, { FC } from 'react';

import { FilterStatuses } from '../../types/filters';
import { setStatusFilter } from '../../store/actions/filtersActions';
import { getStatusFilter } from '../../store/selectors/filtersSelector';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { Button } from '../Button';

import './StatusFilter.scss';

export const StatusFilter: FC = () => {
  const dispatch = useTypedDispatch();
  const filter = useTypedSelector(getStatusFilter);
  const buttons = Object.values(FilterStatuses);

  const filterChangeHandler = (filter: FilterStatuses) =>
    dispatch(setStatusFilter(filter));

  return (
    <div className="filters-wrapper">
      {buttons.map((button, index) => (
        <Button
          key={index}
          selected={filter === button}
          onClick={() => filterChangeHandler(button)}
        >
          {button}
        </Button>
      ))}
    </div>
  );
};
