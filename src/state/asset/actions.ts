import { createAppAsyncThunk } from '../../lib/hooks/useRedux.ts';
import { requestRetry, ResponseError } from '../../lib/request';
import { AppResponseError } from '../user/types.ts';
import Config from 'react-native-config';
import { routes } from '../../constants/routes.ts';
import { Asset, Deal } from '../../types/asset.ts';

const { API_URL } = Config;

export const fetchAssets = createAppAsyncThunk(
  'assets/fetchAssets',
  async (value: undefined, { rejectWithValue }) => {
    try {
      return await requestRetry<{
        data: Asset[];
      }>(`${API_URL}${routes.fetchAssets}`);
    } catch (e) {
      return rejectWithValue(e as ResponseError<AppResponseError>);
    }
  },
);

export const fetchMarketplace = createAppAsyncThunk(
  'assets/fetchMarketplace',
  async (value: undefined, { rejectWithValue }) => {
    try {
      return await requestRetry<{
        data: Asset[];
      }>(`${API_URL}${routes.fetchMarketplace}`);
    } catch (e) {
      return rejectWithValue(e as ResponseError<AppResponseError>);
    }
  },
);

export const listAssetToMarket = createAppAsyncThunk(
  'assets/listAssetToMarket',
  async (
    payload: { listingPrice: string; assetUUID: string },
    { rejectWithValue },
  ) => {
    try {
      return await requestRetry<{
        data: Asset[];
      }>(`${API_URL}${routes.fetchMarketplace}/list/${payload.assetUUID}`, {
        body: JSON.stringify(payload),
        method: 'POST',
      });
    } catch (e) {
      return rejectWithValue(e as ResponseError<AppResponseError>);
    }
  },
);

export const deListAssetFromMarket = createAppAsyncThunk(
  'assets/deListAssetFromMarket',
  async (payload: { assetUUID: string }, { rejectWithValue }) => {
    try {
      return await requestRetry<{
        data: Asset[];
      }>(`${API_URL}${routes.fetchMarketplace}/de-list/${payload.assetUUID}`, {
        body: JSON.stringify(payload),
        method: 'POST',
      });
    } catch (e) {
      return rejectWithValue(e as ResponseError<AppResponseError>);
    }
  },
);

export const bookAsset = createAppAsyncThunk(
  'assets/bookAsset',
  async (
    payload: { assetUUID: string; buyer: any; proposedPrice: string },
    { rejectWithValue },
  ) => {
    try {
      return await requestRetry<{
        data: Asset[];
      }>(`${API_URL}${routes.assets}/book`, {
        body: JSON.stringify(payload),
        method: 'POST',
      });
    } catch (e) {
      return rejectWithValue(e as ResponseError<AppResponseError>);
    }
  },
);

export const fetchDeals = createAppAsyncThunk(
  'assets/fetchDeals',
  async (payload: undefined, { rejectWithValue }) => {
    try {
      return await requestRetry<{
        data: Deal[];
      }>(`${API_URL}${routes.fetchDeals}`);
    } catch (e) {
      return rejectWithValue(e as ResponseError<AppResponseError>);
    }
  },
);
