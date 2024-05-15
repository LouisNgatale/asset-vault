import { combineReducers } from '@reduxjs/toolkit';
import globalReducer from './global/reducer.ts';
import userReducer from './user/reducer.ts';

const reducers = {
  global: globalReducer,
  user: userReducer,
};

export default combineReducers(reducers);
