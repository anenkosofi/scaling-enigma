import { nanoid } from 'nanoid';

import {
  AddedTodo,
  UpdatedTodo,
  TodosActionTypes,
  TodosAction,
} from '../types/todos';

export const addTodo = ({ text, start, end }: AddedTodo): TodosAction => {
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

export const editTodo = (
  todoId: string,
  { text, start, end }: UpdatedTodo
): TodosAction => {
  return {
    type: TodosActionTypes.EDIT_TODO,
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

export const clearCompleted = (): TodosAction => {
  return {
    type: TodosActionTypes.CLEAR_COMPLETED,
  };
};
