import React, { FC } from 'react';

import { Button } from '@components/Button';
import { useAppSelector, useAppDispatch } from '@hooks';
import { setStatusFilter } from '@store/filters/actions';
import { selectStatusFilter } from '@store/filters/selectors';
import { FilterStatus } from '@types';

import './StatusFilter.scss';

export const StatusFilter: FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectStatusFilter);
  const buttons = Object.values(FilterStatus);

  const filterChangeHandler = (filter: FilterStatus) =>
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
