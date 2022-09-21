import setInterceptors from './common/setInterceptors';
import { customAxios } from './instance';

export const editProfile = () => {
  return setInterceptors(customAxios).patch(`/profile`);
};
