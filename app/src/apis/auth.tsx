import { AxiosResponse } from 'axios';
import { ENDPOINT } from '../utils/ENDPOINT';
import { customAxios } from './instance';

export const login = (body: {
  [key: string]: string;
}): Promise<AxiosResponse> => {
  return customAxios.post(`${ENDPOINT}auth/signin`, body, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
