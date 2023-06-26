import { createSlice, Reducer } from '@reduxjs/toolkit';

import { FilterStatus, Todo } from '@types';

import {
  getTodos,
  addTodo,
  editTodo,
  deleteTodo,
  deleteCompleted,
} from './operations';

export interface TodosState {
  items: Todo[];
  total: number;
  isLoading: boolean;
  error: string | null;
}

const todosInitialState: TodosState = {
  items: [],
  total: 0,
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
      .addCase(getTodos.fulfilled, (state, { payload }) => {
        const { todos, total } = payload;
        return {
          ...state,
          items: todos,
          total,
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
        const { todo, query } = action.payload;

        let updatedItems = state.items;
        if (state.items.length === 10) {
          updatedItems = todo.text.trim().toLowerCase().includes(query)
            ? [todo, ...state.items.slice(0, 9)]
            : state.items;
        }

        return {
          ...state,
          items: updatedItems,
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
      .addCase(editTodo.fulfilled, (state, { payload }) => {
        const { todo, status } = payload;
        const { _id, completed, ...rest } = todo;
        if (status !== FilterStatus.ALL) {
          const updatedItems = state.items.filter(todo => {
            if (todo.completed !== completed) {
              return todo._id !== _id;
            }
            return todo;
          });

          return {
            ...state,
            items: [...updatedItems],
            isLoading: false,
            error: null,
          };
        }

        const updatedItems = state.items.map(todo =>
          todo._id === _id ? { ...todo, completed, ...rest } : todo
        );

        return {
          ...state,
          items: [...updatedItems],
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

export const todosReducer = todosSlice.reducer as Reducer<TodosState>;
