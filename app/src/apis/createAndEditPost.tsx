import React from 'react';
import { AxiosResponse } from 'axios';
import setInterceptors from './common/setInterceptors';
import { customAxios } from './instance';

const requestEdit = (no: number, form: FormData): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).patch(`boards/${no}`, form);
};

const requestCreate = (form: FormData): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).post(`boards`, form);
};

export { requestCreate, requestEdit };
