import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { devToolsEnhancer } from '@redux-devtools/extension';

import { rootReducer } from './reducers';

const enhancer = devToolsEnhancer();

export const store = createStore(rootReducer, enhancer);

export const persistor = persistStore(store);
