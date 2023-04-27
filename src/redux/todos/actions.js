import { nanoid } from 'nanoid';

export const addTodo = ({ text, start, end }) => {
  return {
    type: 'todos/addTodo',
    payload: {
      id: nanoid(),
      completed: false,
      text,
      time: {
        start,
        end,
      },
    },
  };
};
