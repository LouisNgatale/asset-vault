import { createSlice } from '@reduxjs/toolkit';

const defaultState = {};

const globalSlice = createSlice({
  name: 'global',
  initialState: defaultState,
  reducers: {},
});

export const {} = globalSlice.actions;

export default globalSlice.reducer;
