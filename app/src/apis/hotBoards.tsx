import React from 'react';
import { AxiosResponse } from 'axios';
import { customAxios } from './instance';

const requestHotBoards = (url: string): Promise<AxiosResponse> => {
  return customAxios.get(`${url}`);
};

export { requestHotBoards };
