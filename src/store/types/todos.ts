import { Todo } from '../../types/todo';

export interface TodosState {
  items: Todo[];
}

export enum TodosActionTypes {
  ADD_TODO = 'ADD_TODO',
  TOGGLE_COMPLETED = 'TOGGLE_COMPLETED',
  DELETE_TODO = 'DELETE_TODO',
  EDIT_TODO = 'EDIT_TODO',
  CLEAR_COMPLETED = 'CLEAR_COMPLETED',
}

export type AddedTodo = {
  text: string;
  start: string;
  end: string;
};

export type UpdatedTodo = {
  text?: string;
  start?: string;
  end?: string;
};

interface AddTodoAction {
  type: TodosActionTypes.ADD_TODO;
  payload: Todo;
}

interface ToggleCompletedAction {
  type: TodosActionTypes.TOGGLE_COMPLETED;
  payload: string;
}

interface DeleteTodoAction {
  type: TodosActionTypes.DELETE_TODO;
  payload: string;
}

interface EditTodoAction {
  type: TodosActionTypes.EDIT_TODO;
  payload: {
    id: string;
    todo: Partial<Todo>;
  };
}

interface ClearCompletedAction {
  type: TodosActionTypes.CLEAR_COMPLETED;
}

export type TodosAction =
  | AddTodoAction
  | ToggleCompletedAction
  | DeleteTodoAction
  | EditTodoAction
  | ClearCompletedAction;
