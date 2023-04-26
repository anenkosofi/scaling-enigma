import { nanoid } from 'nanoid';

export const addTodo = ({ title, description, start, end }) => {
  return {
    type: 'todos/addTodo',
    payload: {
      id: nanoid(),
      completed: false,
      title,
      description,
      time: {
        start,
        end,
      },
    },
  };
};

export const deleteTodo = todoId => {
  return {
    type: 'todos/deleteTodo',
    payload: todoId,
  };
};

export const toggleCompleted = todoId => {
  return {
    type: 'todos/toggleCompleted',
    payload: todoId,
  };
};
