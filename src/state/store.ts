import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
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

import { reduxStorage } from './storage';
import reducer from './reducer';

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  blacklist: [],
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, reducer);

// TODO: Add api middlewares
const middlewares: any[] = [];

let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['company.all', 'user.all', 'user.users'],
      },
      immutableCheck: false,
    }).concat(middlewares);
  },
  enhancers: (getDefaultEnhancers) => {
    return getDefaultEnhancers();
  },
});

const lev = false;
if (lev) {
  // require('basil-ws-flipper').wsDebugPlugin;

  // const createFlipperMiddleware =
  //     require('rn-redux-middleware-flipper').default;
  // middlewares.push(createFlipperMiddleware());
  //
  // const createDebugger = require('redux-flipper').default;
  // middlewares.push(createDebugger());

  // const actionsBlacklist: string[] = [];
  // const actionsWhitelist: string[] = [];
  // const actionReplayDelay = 500;

  // const reduxDebugger = require('redux-middleware-flipper').default;
  // middlewares.push(
  //     reduxDebugger({actionsBlacklist, actionsWhitelist, actionReplayDelay}),
  // );

  store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
        actionCreatorCheck: false,
      }).concat(middlewares);
    },
    enhancers: (getDefaultEnhancers) => {
      return getDefaultEnhancers();
    },
  });
}

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
