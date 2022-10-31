import setInterceptors from './common/setInterceptors';
import { customAxios } from './instance';
import { ENDPOINT } from '../utils/ENDPOINT';

export const editProfile = (body: FormData) => {
  return setInterceptors(customAxios).patch(`/profile`, body);
};

export const validateNickName = (body: {
  no: number | null;
  nickname: string;
}) => {
  return setInterceptors(customAxios).post(
    `${ENDPOINT}profile/check-nickname`,
    body,
  );
};
