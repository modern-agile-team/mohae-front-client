/** @format */

const response = 1;

const getToken = () => {
  return sessionStorage.getItem('access_token') || '';
};

export const getAccessToken = () => {
  if (typeof window !== 'undefined')
    return window.sessionStorage.getItem('access_token');
  return undefined;
};

export const getRefreshToken = () => {
  if (typeof window !== 'undefined')
    return window.sessionStorage.getItem('refresh_token');
  return undefined;
};

export const setAccessToken = (token: string) => {
  if (typeof window !== 'undefined')
    return window.sessionStorage.setItem('access_token', token);
  return undefined;
};

export default getToken;
