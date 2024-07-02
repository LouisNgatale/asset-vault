import { createAppAsyncThunk } from '../../lib/hooks/useRedux.ts';
import { requestRetry, ResponseError } from '../../lib/request';
import { AppResponseError } from '../user/types.ts';
import { API_URL, routes } from '../../constants/routes.ts';
import { Asset, BookingStage, Deal } from '../../types/asset.ts';

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

export const sendMessage = createAppAsyncThunk(
  'assets/sendMessage',
  async (
    {
      messages,
      dealUUID,
    }: {
      messages: any[];
      dealUUID: string;
    },
    { rejectWithValue },
  ) => {
    try {
      return await requestRetry<{
        data: Deal[];
      }>(`${API_URL}${routes.sendMessage}/${dealUUID}`, {
        method: 'POST',
        body: JSON.stringify(messages),
      });
    } catch (e) {
      return rejectWithValue(e as ResponseError<AppResponseError>);
    }
  },
);

export const updateDeal = createAppAsyncThunk(
  'assets/updateDeal',
  async (
    {
      stage,
      dealUUID,
    }: {
      stage: BookingStage;
      dealUUID: string;
    },
    { rejectWithValue },
  ) => {
    try {
      return await requestRetry<{
        data: Deal[];
      }>(`${API_URL}${routes.fetchDeals}/${dealUUID}`, {
        method: 'PUT',
        body: JSON.stringify(stage),
      });
    } catch (e) {
      return rejectWithValue(e as ResponseError<AppResponseError>);
    }
  },
);

export const uploadContract = createAppAsyncThunk(
  'assets/uploadContract',
  async (
    data: {
      dealUUID: string;
      signedContract?: string;
      originalContract?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { dealUUID, ...payload } = data;

      return await requestRetry<{
        data: Deal[];
      }>(`${API_URL}${routes.fetchDeals}/${dealUUID}/upload`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch (e) {
      return rejectWithValue(e as ResponseError<AppResponseError>);
    }
  },
);

export const confirmPayment = createAppAsyncThunk(
  'assets/uploadContract',
  async (
    data: {
      dealUUID: string;
      paidAmount: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { dealUUID, ...payload } = data;

      const response = await requestRetry<{
        data: Deal;
      }>(`${API_URL}${routes.fetchDeals}/${dealUUID}/payment`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      return response;
    } catch (e) {
      return rejectWithValue(e as ResponseError<AppResponseError>);
    }
  },
);
