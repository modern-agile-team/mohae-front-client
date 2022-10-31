import { customAxios } from './instance';
import setInterceptors from './common/setInterceptors';
import { AxiosResponse } from 'axios';

interface ChangePasswordType {
  email: string;
  nowPassword: string;
  changePassword: string;
  confirmChangePassword: string;
}

export const changePassword = (
  data: ChangePasswordType,
): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).patch(`/auth/change/password`, data);
};
