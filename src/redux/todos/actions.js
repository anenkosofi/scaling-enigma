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

export const toggleCompleted = todoId => {
  return {
    type: 'todos/toggleCompleted',
    payload: todoId,
  };
};
