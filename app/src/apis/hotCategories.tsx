import { AxiosResponse } from 'axios';
import { customAxios } from './instance';

const getHotCategories = (): Promise<AxiosResponse> => {
  return customAxios.get(`/categories/popular`);
};
export default getHotCategories;
