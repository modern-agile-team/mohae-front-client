import React from 'react';
import setInterceptors from './common/setInterceptors';
import { customAxios } from './instance';

const requestReport = (body: {
  head: string;
  headNo: number;
  checks: number[];
  description: string;
}) => {
  return setInterceptors(customAxios).post('reports', body);
};

export { requestReport };
