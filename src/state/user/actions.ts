import { createAppAsyncThunk } from '../../lib/hooks/useRedux.ts';
import requestRetry, { ResponseError } from '../../lib/request';
import Config from 'react-native-config';
import {
  AppResponseError,
  LoginDto,
  LoginResponse,
  RegisterResponse,
  RegistrationDto,
} from './types.ts';
import { routes } from '../../constants/routes.ts';
import { saveTokenAndUserIdToStorage } from '../../utils/user.ts';

const { API_URL } = Config;

export const login = createAppAsyncThunk(
  'user/login',
  async (values: LoginDto, { rejectWithValue }) => {
    try {
      const response = await requestRetry<LoginResponse>(
        `${API_URL}${routes.login}`,
        {
          method: 'POST',
          // Fetch API wants you to stringify this object
          body: JSON.stringify(values),
        },
      );

      const loginResponse = response as LoginResponse;

      saveTokenAndUserIdToStorage(
        loginResponse.data.accessToken,
        loginResponse.data.user.uuid,
      );

      return loginResponse;
    } catch (e) {
      return rejectWithValue(e as ResponseError<AppResponseError>);
    }
  },
);

export const register = createAppAsyncThunk(
  'user/register',
  async (values: RegistrationDto, { rejectWithValue }) => {
    try {
      return await requestRetry<
        RegisterResponse | ResponseError<AppResponseError>
      >(`${API_URL}${routes.register}`, {
        method: 'POST',
        // Fetch API wants you to stringify this object
        body: JSON.stringify(values),
      });
    } catch (e) {
      return rejectWithValue(e as ResponseError<AppResponseError>);
    }
  },
);
