import { Todo } from '../../types/todo';

export interface TodosState {
  items: Todo[];
}

export enum TodosActionTypes {
  ADD_TODO = 'todos/addTodo',
  TOGGLE_COMPLETED = 'todos/toggleCompleted',
  DELETE_TODO = 'todos/deleteTodo',
  EDIT_TODO = 'todos/editTodo',
  CLEAR_COMPLETED = 'todos/clearCompleted',
}

export interface TodosAction {
  type: TodosActionTypes;
  payload?: Todo | Omit<Todo, 'completed'> | string;
}
