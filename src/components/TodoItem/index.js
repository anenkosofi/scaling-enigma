/* eslint-disable react/prop-types */
import { TbClock, TbCalendarTime } from 'react-icons/tb';

import css from './TodoItem.module.css';

export const TodoItem = ({
  item: {
    text,
    time: { start, end },
  },
}) => {
  return (
    <li className={css.todoCard}>
      <p>{text}</p>
      <p className={css.date}>
        <TbClock size={20} />
        <span className={css.dateDescr}>
          <b>Start: </b>
          {start}
        </span>
      </p>
      <p className={css.date}>
        <TbCalendarTime size={20} />
        <span className={css.dateDescr}>
          <b>Due to: </b>
          {end}
        </span>
      </p>
    </li>
  );
};
