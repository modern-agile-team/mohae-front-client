import { customAxios } from './instance';
import setInterceptors from './common/setInterceptors';

export const profile = (no: number) => {
  return setInterceptors(customAxios).get(`/profile/${no}`);
};
