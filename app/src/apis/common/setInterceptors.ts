import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { setToken, getToken } from '../../utils/getToken';
import { ACCESS_TOKEN, REFESH_TOKEN } from '../../consts/tokenKey';

export const setInterceptors = (instance: AxiosInstance): AxiosInstance => {
  const accesstoken = getToken(ACCESS_TOKEN);
  let newToken = '';
  instance.interceptors.request.use(
    function (config: AxiosRequestConfig) {
      if (accesstoken && config.headers) {
        config.headers['Authorization'] = `Bearer ${getToken(ACCESS_TOKEN)}`;
        return config;
      } else return config;
    },
    function (error: AxiosError) {
      return Promise.reject(error);
    },
  );
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    async error => {
      const { config } = error;
      if (error.response.status === 401) {
        if (error.response.statusText === 'Unauthorized') {
          const originalRequest = config;
          const refresh_token = getToken(REFESH_TOKEN);
          if (refresh_token) {
            originalRequest.headers.Authorization = `Bearer ${refresh_token}`;
            await axios(originalRequest).catch(error => {
              if (error.response.status === 410) {
                newToken = '';
                return Promise.reject(error);
              } else if (
                error.response.data.error.statusCode === 401 &&
                error.response.data.error.message !== 'Unauthorized'
              ) {
                setToken(ACCESS_TOKEN, error.response.data.error.message);
                newToken = error.response.data.error.message;
              }
            });
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return axios(originalRequest);
            }
          }
        }
      }
      return Promise.reject(error);
    },
  );
  return instance;
};

export default setInterceptors;
