import { createAppAsyncThunk } from '../../lib/hooks/useRedux.ts';
import requestRetry, { ResponseError } from '../../lib/request';
import Config from 'react-native-config';
import { LoginDto, LoginResponse } from './types.ts';
import { routes } from '../../constants/routes.ts';

const { API_URL } = Config;

export const login = createAppAsyncThunk(
  'user/login',
  async (values: LoginDto, { rejectWithValue }) => {
    try {
      return await requestRetry<LoginResponse>(`${API_URL}${routes.login}`, {
        method: 'POST',
        // Fetch API wants you to stringify this object
        body: JSON.stringify(values),
      });
    } catch (e) {
      return rejectWithValue(e as ResponseError);
    }
  },
);
