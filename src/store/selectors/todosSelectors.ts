import { RootState } from '../reducers';

export const getTodos = (state: RootState) => state.todos.items;
