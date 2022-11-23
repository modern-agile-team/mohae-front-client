import { customAxios } from './instance';
import setInterceptors from './common/setInterceptors';
import { AxiosResponse } from 'axios';

interface ChangePasswordType {
  email: string;
  nowPassword: string;
  changePassword: string;
  confirmChangePassword: string;
}

const changePassword = (data: ChangePasswordType): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).patch(`/auth/change/password`, data);
};

const requestEmail = (body: {
  name: string;
  email: string;
}): Promise<AxiosResponse> => {
  return customAxios.post(`email/forget/password`, body);
};

const setNewPassword = (
  body: {
    email: string;
    changePassword: string;
    confirmChangePassword: string;
  },
  headers: string,
): Promise<AxiosResponse> => {
  return customAxios.patch(`auth/forget/password`, body, {
    headers: { key: headers },
  });
};

export { changePassword, requestEmail, setNewPassword };
