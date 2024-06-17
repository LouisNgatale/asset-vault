import { createSlice } from '@reduxjs/toolkit';
import { fetchAssets } from './actions.ts';
import { Asset } from '../../types/asset.ts';

interface IState {
  loading: boolean;
  assets: Asset[];
}

const defaultState: IState = {
  loading: false,
  assets: [],
};

const assetSlice = createSlice({
  name: 'asset',
  initialState: defaultState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAssets.fulfilled, (state, { payload }) => ({
      ...state,
      assets: payload.data,
    }));
  },
});

export default assetSlice.reducer;
