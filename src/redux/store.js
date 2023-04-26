import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';

import { todosReducer } from './todos/reducer';

const rootReducer = combineReducers({
  todos: todosReducer,
});

const enhancer = devToolsEnhancer();

export const store = createStore(rootReducer, enhancer);
