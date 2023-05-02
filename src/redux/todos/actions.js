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

export const deleteTodo = todoId => {
  return {
    type: 'todos/deleteTodo',
    payload: todoId,
  };
};

export const editTodo = (todoId, { text, start, end }) => {
  return {
    type: 'todos/editTodo',
    payload: {
      id: todoId,
      todo: {
        text,
        time: {
          start,
          end,
        },
      },
    },
  };
};

export const clearCompleted = () => {
  return {
    type: 'todos/clearCompleted',
  };
};
