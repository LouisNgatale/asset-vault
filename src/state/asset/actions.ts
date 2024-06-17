import { createAppAsyncThunk } from '../../lib/hooks/useRedux.ts';
import { requestRetry, ResponseError } from '../../lib/request';
import { AppResponseError } from '../user/types.ts';
import Config from 'react-native-config';
import { routes } from '../../constants/routes.ts';
import { Asset } from '../../types/asset.ts';

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
