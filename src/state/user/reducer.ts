import { createSlice } from '@reduxjs/toolkit';
import { login } from './actions.ts';

const defaultState = {
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state) => ({
      ...state,
      loading: false,
    }));
    builder.addCase(login.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(login.rejected, (state) => ({
      ...state,
      loading: false,
    }));
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
