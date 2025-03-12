import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const getCacheNumber = (key: string) => {
  return storage.contains(key) ? storage.getNumber(key) : null;
};

export const getCacheString = (key: string) => {
  return storage.contains(key) ? storage.getString(key) : null;
};