import { createSlice } from '@reduxjs/toolkit';

import { Todo } from '@types';

import {
  getTodos,
  addTodo,
  editTodo,
  deleteTodo,
  deleteCompleted,
} from './operations';

export interface TodosState {
  items: Todo[];
  isLoading: boolean;
  error: string | null;
}

const todosInitialState: TodosState = {
  items: [],
  isLoading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosInitialState,
  reducers: {},
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
          error: null,
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
      })
      .addCase(deleteTodo.pending, state => {
        return { ...state, isLoading: true };
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        return {
          ...state,
          items: state.items.filter(todo => todo._id !== action.payload._id),
          isLoading: false,
          error: null,
        };
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload ? action.payload : 'An unknown error occured',
        };
      })
      .addCase(deleteCompleted.pending, state => {
        return { ...state, isLoading: true };
      })
      .addCase(deleteCompleted.fulfilled, state => {
        return {
          ...state,
          items: state.items.filter(todo => !todo.completed),
          isLoading: false,
          error: null,
        };
      })
      .addCase(deleteCompleted.rejected, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: action.payload ? action.payload : 'An unknown error occured',
        };
      }),
});

export const todosReducer = todosSlice.reducer;
