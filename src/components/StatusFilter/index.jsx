import { useSelector, useDispatch } from 'react-redux';

import { statusFilters } from '../../redux/filters/constants';
import { setStatusFilter } from '../../redux/filters/actions';
import { getStatusFilter } from '../../redux/filters/selectors';
import { clearCompleted } from '../../redux/todos/actions';
import { Container } from '../Container';
import { Button } from '../Button';

import './StatusFilter.scss';

export const StatusFilter = () => {
  const filter = useSelector(getStatusFilter);
  const dispatch = useDispatch();
  const buttons = Object.values(statusFilters);

  const filterChangeHandler = filter => dispatch(setStatusFilter(filter));

  const clearCompletedHandler = () => dispatch(clearCompleted());

  return (
    <Container>
      <div className="wrapper">
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
        <button
          type="button"
          className="clear-button"
          onClick={clearCompletedHandler}
        >
          Clear completed
        </button>
      </div>
    </Container>
  );
};
