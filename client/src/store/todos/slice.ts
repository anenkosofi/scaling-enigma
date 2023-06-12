import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Todo } from '@types';

import { getTodos } from './operations';

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
  reducers: {
    addTodo(state, { payload }: PayloadAction<Todo>) {
      return { ...state, items: [payload, ...state.items] };
    },
    removeTodo(state, { payload }: PayloadAction<string>) {
      return {
        ...state,
        items: state.items.filter(({ id }) => id !== payload),
      };
    },
    editTodo(state, { payload }: PayloadAction<Partial<Todo>>) {
      return {
        ...state,
        items: state.items.map(todo => {
          const { id, ...rest } = payload as Todo;
          return todo.id === id ? { ...todo, ...rest } : todo;
        }),
      };
    },
    toggleCompleted(state, { payload }: PayloadAction<string>) {
      return {
        ...state,
        items: state.items.map(todo =>
          todo.id === payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    },
    clearCompleted(state) {
      return { ...state, items: state.items.filter(todo => !todo.completed) };
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
          items: action.payload,
          isLoading: false,
        };
      })
      .addCase(getTodos.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload ? action.payload : 'An unknown error occured',
          isLoading: false,
        };
      }),
});

export const {
  addTodo,
  removeTodo,
  editTodo,
  toggleCompleted,
  clearCompleted,
} = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
