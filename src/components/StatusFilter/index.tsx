import { useSelector, useDispatch } from 'react-redux';

import { statusFilters } from '../../redux/filters/constants';
import { setStatusFilter } from '../../redux/filters/actions';
import { getStatusFilter } from '../../redux/filters/selectors';
import { Button } from '../Button';

import './StatusFilter.scss';

export const StatusFilter = () => {
  const filter = useSelector(getStatusFilter);
  const dispatch = useDispatch();
  const buttons = Object.values(statusFilters);

  const filterChangeHandler = filter => dispatch(setStatusFilter(filter));

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
