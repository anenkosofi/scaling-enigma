import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { filtersReducer } from './filters/reducer';
import { todosReducer } from './todos/reducer';

const todosPersistConfig = {
  key: 'todos',
  storage,
};

export const rootReducer = combineReducers({
  todos: persistReducer(todosPersistConfig, todosReducer),
  filters: filtersReducer,
});
