import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Todo } from '@types';

import { getTodos, addTodo, editTodo } from './operations';

export interface TodosState {
  items: Todo[];
  isLoading: boolean;
  error: string | null;
  query: string;
}

const todosInitialState: TodosState = {
  items: [],
  isLoading: false,
  error: null,
  query: '',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosInitialState,
  reducers: {
    removeTodo(state, { payload }: PayloadAction<string>) {
      return {
        ...state,
        items: state.items.filter(({ _id }) => _id !== payload),
      };
    },
    clearCompleted(state) {
      return { ...state, items: state.items.filter(todo => !todo.completed) };
    },
    setQuery(state, action: PayloadAction<string>) {
      return { ...state, query: action.payload };
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getTodos.pending, state => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        return {
          ...state,
          items: action.payload.reverse(),
          isLoading: false,
        };
      })
      .addCase(getTodos.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload ? action.payload : 'An unknown error occured',
          isLoading: false,
        };
      })
      .addCase(addTodo.pending, state => {
        return { ...state, isLoading: true };
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        return {
          ...state,
          items: [action.payload, ...state.items],
          isLoading: false,
          error: null,
        };
      })
      .addCase(addTodo.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload ? action.payload : 'An unknown error occured',
        };
      })
      .addCase(editTodo.pending, state => {
        return { ...state, isLoading: true };
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        return {
          ...state,
          items: state.items.map(todo => {
            const { _id, ...rest } = action.payload;
            return todo._id === _id ? { ...todo, ...rest } : todo;
          }),
          isLoading: false,
          error: null,
        };
      })
      .addCase(editTodo.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload ? action.payload : 'An unknown error occured',
        };
      }),
});

export const { removeTodo, clearCompleted, setQuery } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
