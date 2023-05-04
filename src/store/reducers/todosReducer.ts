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
      return { ...state, items: [payload, ...state.items] };

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
          const { id, todo: updatedTodo } = payload;
          return todo.id === id ? { ...todo, ...updatedTodo } : todo;
        }),
      };

    case TodosActionTypes.CLEAR_COMPLETED:
      return { ...state, items: state.items.filter(todo => !todo.completed) };

    default:
      return state;
  }
};
