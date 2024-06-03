import Config from 'react-native-config';
import retry, { Options } from 'async-retry';

import merge from 'lodash/merge';

import {
  IResponseValidationInnerError,
  IError,
  IResponseError,
} from '../../types/errors';
import { STORAGE_INFO } from '../../constants';

import { storage } from '../../state/storage';

export const retries = 5;
const { TOKEN_API_ID } = Config;

export class ResponseError<T> extends Error {
  public message: string = '';

  public code?: string;

  public errorMessage?: string;

  public status?: number;

  public errorCode?: string;

  public error?: IError | IResponseValidationInnerError[];

  public data?: T;

  constructor(response: IResponseError) {
    super(response?.message || response?.errorMessage);

    Object.assign(this, response);
  }
}

export const defaultOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-authentication-context': 'mobile-app',
    'Content-Language': 'en',
    'x-device-type': '',
    'x-build-number': '',
    'x-api-token': TOKEN_API_ID,
    Authorization: TOKEN_API_ID,
  },
  method: 'GET',
};

const isJson = (response: Response): boolean => {
  const contentType = response.headers.get('Content-Type');
  return !!(contentType && contentType.indexOf('application/json') !== -1);
};

export async function __request<T = { [key: string]: any }>(
  url: string,
  options: RequestInit = {},
  fetchFn: typeof fetch = fetch,
): Promise<T> {
  try {
    // Get token from storage
    const token = storage.getString(STORAGE_INFO.TOKEN);
    // Get language from storage
    const language = storage.getString(STORAGE_INFO.LANGUAGE) || 'en';

    // Set preferred language
    defaultOptions.headers['Content-Language'] = language;
    // Set preferred currency

    defaultOptions.headers['x-api-token'] = token;
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  } catch (error) {
    console.warn(error);
  }

  const allOptions = merge({}, defaultOptions, options);

  // Start the fetch and obtain a reader
  const response = await fetchFn(url, allOptions);

  const json = isJson(response) ? await response.json() : null;

  if (response.ok) {
    return json;
  }

  throw json;
}

export async function requestRetry<T = { [key: string]: any }>(
  url: string,
  options: RequestInit = {},
  fetchFn: typeof fetch = fetch,
  retries?: number,
): Promise<T> {
  const response = await retry(
    async (bail: Function) => {
      try {
        return await __request<T>(url, options, fetchFn);
      } catch (e) {
        // @ts-ignore
        if (e && (e?.status >= 400 || e?.status < 500)) {
          return bail(e as IResponseError);
        }

        throw e;
      }
    },
    {
      retries,
    } as Options,
  );

  return response;
}

export async function request<T = { [key: string]: any }>(
  url: string,
  options: RequestInit = {},
  fetchFn: typeof fetch = fetch,
): Promise<T | { error: IResponseError }> {
  try {
    try {
      // Get token from storage
      const token = storage.getString(STORAGE_INFO.TOKEN);
      // Get language from storage
      const language = storage.getString(STORAGE_INFO.LANGUAGE) || 'en';

      // Set preferred language
      defaultOptions.headers['Content-Language'] = language;

      defaultOptions.headers['x-api-token'] = token;
      defaultOptions.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.warn(error);
    }

    const allOptions = merge({}, defaultOptions, options);

    // Start the fetch and obtain a reader
    const response = await fetchFn(url, allOptions);

    const json = isJson(response) ? await response.json() : null;

    if (response.ok) {
      return json;
    }

    throw new ResponseError(json);
  } catch (e) {
    return { error: e } as { error: IResponseError };
  }
}

export default requestRetry;
