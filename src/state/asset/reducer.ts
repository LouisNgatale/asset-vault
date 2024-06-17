import { createSlice } from '@reduxjs/toolkit';
import { fetchAssets, fetchDeals } from './actions.ts';
import { Asset, Deal } from '../../types/asset.ts';

interface IState {
  loading: boolean;
  assets: Asset[];
  deals: Deal[];
}

const defaultState: IState = {
  loading: false,
  assets: [],
  deals: [],
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
    builder.addCase(fetchDeals.fulfilled, (state, { payload }) => ({
      ...state,
      deals: payload.data,
    }));
  },
});

export default assetSlice.reducer;
