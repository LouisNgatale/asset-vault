import { combineReducers } from '@reduxjs/toolkit';
import globalReducer from './global/reducer.ts';
import userReducer from './user/reducer.ts';
import assetReducer from './asset/reducer.ts';

const reducers = {
  global: globalReducer,
  user: userReducer,
  assets: assetReducer,
};

export default combineReducers(reducers);
