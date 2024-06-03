import { STORAGE_INFO } from '../constants';
import { storage } from '../state/storage.ts';

export const saveTokenAndUserIdToStorage = (token: string, userId: string) => {
  storage.set(STORAGE_INFO.TOKEN, token);
  storage.set(STORAGE_INFO.USER_ID, userId);
};

export const clearTokenAndUserIdFromStorage = () => {
  storage.delete(STORAGE_INFO.TOKEN);
  storage.delete(STORAGE_INFO.USER_ID);
};
