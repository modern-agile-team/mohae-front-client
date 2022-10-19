import { AxiosResponse } from 'axios';
import { customAxios } from './instance';

const requestCategorySelected = (
  categoryNo: number,
  pageNatinNo: number,
): Promise<AxiosResponse> => {
  return customAxios.get(
    `https://mo-hae.site/boards/category/${categoryNo}?take=12&page=${pageNatinNo}`,
  );
};

const requestFiltering = (
  pageNatinNo: number,
  query: string,
): Promise<AxiosResponse> => {
  return customAxios.get(
    `https://mo-hae.site/boards/filter?take=12&page=${pageNatinNo}` + query,
  );
};

export { requestCategorySelected, requestFiltering };
