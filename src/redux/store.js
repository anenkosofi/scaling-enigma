import { createStore } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';

const initialState = {
  todos: [],
  filters: {
    status: 'all',
  },
};

const rootReducer = (state = initialState) => {
  return state;
};

const enhancer = devToolsEnhancer();

export const store = createStore(rootReducer, enhancer);
