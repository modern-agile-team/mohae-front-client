/** @format */

export const getToken = (key: string) => {
  const storageItem = localStorage.getItem(key);
  return storageItem ? JSON.parse(storageItem) : '';
};

export const setToken = (key: string, token: string) => {
  return localStorage.setItem(key, JSON.stringify(token));
};

export const removeToken = (key: string) => {
  return localStorage.removeItem(key);
};

export default getToken;
