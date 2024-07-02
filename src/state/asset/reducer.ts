import { createSlice } from '@reduxjs/toolkit';
import { confirmPayment, fetchAssets, fetchDeals } from './actions.ts';
import { Asset, Deal } from '../../types/asset.ts';

interface IState {
  loading: boolean;
  assets: Asset[];
  deals: Deal[];
  deal?: Deal;
}

const defaultState: IState = {
  loading: false,
  assets: [],
  deals: [],
  deal: undefined,
};

const assetSlice = createSlice({
  name: 'asset',
  initialState: defaultState,
  reducers: {
    setDeal: (state, { payload }) => ({
      ...state,
      deal: payload,
    }),
  },
  extraReducers(builder) {
    builder.addCase(fetchAssets.fulfilled, (state, { payload }) => ({
      ...state,
      assets: payload.data,
    }));
    builder.addCase(fetchDeals.fulfilled, (state, { payload }) => ({
      ...state,
      deals: payload.data,
    }));

    builder.addCase(confirmPayment.fulfilled, (state, { payload }) => ({
      ...state,
      deal: payload.data,
    }));
  },
});

export const { setDeal } = assetSlice.actions;
export default assetSlice.reducer;
