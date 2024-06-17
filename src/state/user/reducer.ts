import { createSlice } from '@reduxjs/toolkit';
import { login, register } from './actions.ts';

type DefaultState = {
  loading: boolean;
  accessToken: string | null;
  user: any | null;
};

const defaultState: DefaultState = {
  loading: false,
  accessToken: null,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {
    setUserLoading: (state, { payload }) => ({
      ...state,
      loading: payload,
    }),
    setAccessToken: (state, { payload }) => ({
      ...state,
      accessToken: payload,
    }),
  },
  extraReducers(builder) {
    // Logging in
    builder.addCase(login.fulfilled, function (state, { payload }) {
      return {
        ...state,
        user: payload.data.user,
        accessToken: payload.data.accessToken,
        loading: false,
      };
    });
    builder.addCase(login.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(login.rejected, (state) => ({
      ...state,
      loading: false,
    }));

    // Registration
    builder.addCase(register.fulfilled, (state) => ({
      ...state,
      loading: false,
    }));
    builder.addCase(register.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(register.rejected, (state) => ({
      ...state,
      loading: false,
    }));
  },
});

export const { setUserLoading, setAccessToken } = userSlice.actions;

export default userSlice.reducer;
