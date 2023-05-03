import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { devToolsEnhancer } from '@redux-devtools/extension';

import { todosReducer } from './todos/reducer';
import { filtersReducer } from './filters/reducer';

const todosPersistConfig = {
  key: 'todos',
  storage,
};

const rootReducer = combineReducers({
  todos: persistReducer(todosPersistConfig, todosReducer),
  filters: filtersReducer,
});

const enhancer = devToolsEnhancer();

export const store = createStore(rootReducer, enhancer);

export const persistor = persistStore(store);
