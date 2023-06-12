import { devToolsEnhancer } from '@redux-devtools/extension';
import { createStore } from 'redux';
import { persistStore } from 'redux-persist';

import { rootReducer } from './reducers';

const enhancer = devToolsEnhancer();

export const store = createStore(rootReducer, enhancer);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
