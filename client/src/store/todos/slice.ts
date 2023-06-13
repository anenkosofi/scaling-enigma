import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Todo } from '@types';

import { getTodos, addTodo } from './operations';

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
        items: state.items.filter(({ _id }) => _id !== payload),
      };
    },
    editTodo(state, { payload }: PayloadAction<Partial<Todo>>) {
      return {
        ...state,
        items: state.items.map(todo => {
          const { _id, ...rest } = payload as Todo;
          return todo._id === _id ? { ...todo, ...rest } : todo;
        }),
      };
    },
    toggleCompleted(state, { payload }: PayloadAction<string>) {
      return {
        ...state,
        items: state.items.map(todo =>
          todo._id === payload ? { ...todo, completed: !todo.completed } : todo
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
      }),
});

export const { removeTodo, editTodo, toggleCompleted, clearCompleted } =
  todosSlice.actions;
export const todosReducer = todosSlice.reducer;
