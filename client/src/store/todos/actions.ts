import { nanoid } from 'nanoid';

import { Todo } from '@types';

import { TodosActionTypes, TodosAction } from '../types/todo';

export const addTodo = ({
  text,
  time: { start, end },
}: Omit<Todo, 'id' | 'completed'>): TodosAction => {
  return {
    type: TodosActionTypes.ADD_TODO,
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

export const toggleCompleted = (todoId: string): TodosAction => {
  return {
    type: TodosActionTypes.TOGGLE_COMPLETED,
    payload: todoId,
  };
};

export const deleteTodo = (todoId: string) => {
  return {
    type: TodosActionTypes.DELETE_TODO,
    payload: todoId,
  };
};

export const editTodo = (todo: Omit<Todo, 'completed'>): TodosAction => {
  return {
    type: TodosActionTypes.EDIT_TODO,
    payload: todo,
  };
};

export const clearCompleted = (): TodosAction => {
  return {
    type: TodosActionTypes.CLEAR_COMPLETED,
  };
};
