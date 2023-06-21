import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from './auth/slice';
import { AuthState } from './auth/slice';
import { filtersReducer } from './filters/slice';
import { FiltersState } from './filters/slice';
import { todosReducer } from './todos/slice';
import { TodosState } from './todos/slice';

const todosPersistConfig = {
  key: 'todos',
  storage,
};

const filtersPersistConfig = {
  key: 'filters',
  storage,
  whitelist: ['query'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
};

export const store = configureStore({
  reducer: {
    todos: persistReducer<TodosState>(todosPersistConfig, todosReducer),
    filters: persistReducer<FiltersState>(filtersPersistConfig, filtersReducer),
    auth: persistReducer<AuthState>(authPersistConfig, authReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
