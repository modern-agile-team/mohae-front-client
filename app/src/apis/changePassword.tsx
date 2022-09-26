import { customAxios } from './instance';
import setInterceptors from './common/setInterceptors';

interface ChangePasswordType {
  email: string;
  nowPassword: string;
  changePassword: string;
  confirmChangePassword: string;
}

export const changePassword = (data: ChangePasswordType) => {
  console.log(data);
  return setInterceptors(customAxios).patch(`/auth/change/password`, data);
};
