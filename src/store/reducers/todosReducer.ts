import { Todo } from '../../types/todo';
import { TodosState, TodosActionTypes, TodosAction } from '../types/todos';

const todosInitialState: TodosState = {
  items: [],
};

export const todosReducer = (
  state = todosInitialState,
  { type, payload }: TodosAction
): TodosState => {
  switch (type) {
    case TodosActionTypes.ADD_TODO:
      return { ...state, items: [payload as Todo, ...state.items] };

    case TodosActionTypes.TOGGLE_COMPLETED:
      return {
        ...state,
        items: state.items.map(todo =>
          todo.id === payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };

    case TodosActionTypes.DELETE_TODO:
      return {
        ...state,
        items: state.items.filter(({ id }) => id !== payload),
      };

    case TodosActionTypes.EDIT_TODO:
      return {
        ...state,
        items: state.items.map(todo => {
          const { id, ...rest } = payload as Todo;
          return todo.id === id ? { ...todo, ...rest } : todo;
        }),
      };

    case TodosActionTypes.CLEAR_COMPLETED:
      return { ...state, items: state.items.filter(todo => !todo.completed) };

    default:
      return state;
  }
};
