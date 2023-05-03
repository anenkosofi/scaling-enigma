import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';

import { todosReducer } from './todos/reducer';
import { filtersReducer } from './filters/reducer';

const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
});

const enhancer = devToolsEnhancer();

export const store = createStore(rootReducer, enhancer);
