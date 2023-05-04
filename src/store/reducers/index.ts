import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { todosReducer } from './todosReducer';
import { filtersReducer } from './filtersReducer';

const todosPersistConfig = {
  key: 'todos',
  storage,
};

export const rootReducer = combineReducers({
  todos: persistReducer(todosPersistConfig, todosReducer),
  filters: filtersReducer,
});
