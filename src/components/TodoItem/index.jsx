import { TbClock, TbCalendarTime } from 'react-icons/tb';
import PropTypes from 'prop-types';

import './TodoItem.scss';

export const TodoItem = ({
  item: {
    text,
    time: { start, end },
  },
}) => {
  return (
    <li className="todoCard">
      <p className="todoCard-text">{text}</p>
      <p className="todoCard-date">
        <TbClock size={20} />
        <span className="todoCard-date__descr">
          <b>Start: </b>
          {start}
        </span>
      </p>
      <p className="todoCard-date">
        <TbCalendarTime size={20} />
        <span className="TodoCard-date__descr">
          <b>Due to: </b>
          {end}
        </span>
      </p>
    </li>
  );
};

TodoItem.propTypes = {
  item: PropTypes.shape({
    text: PropTypes.string.isRequired,
    time: PropTypes.exact({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
