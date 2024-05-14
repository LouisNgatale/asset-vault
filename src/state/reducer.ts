import { combineReducers } from '@reduxjs/toolkit';
import globalReducer from './global/reducer.ts';

const reducers = {
  global: globalReducer,
};

export default combineReducers(reducers);
