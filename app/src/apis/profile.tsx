import setInterceptors from './common/setInterceptors';
import { customAxios } from './instance';

export const editProfile = (body: FormData) => {
  return setInterceptors(customAxios).patch(`/profile`, body);
};
