import { AxiosResponse } from 'axios';
import {
  EditAndDeleteParameterType,
  PostParameterType,
} from '../types/replies/type';
import setInterceptors from './common/setInterceptors';
import { customAxios } from './instance';

export const createReply = ({
  no,
  body,
}: PostParameterType): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).post(`comments/${no}/replies`, body);
};

export const editReply = (
  no: number,
  replyNo: number,
  body: EditAndDeleteParameterType,
): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).put(
    `comments/${no}/replies/${replyNo}`,
    body,
  );
};

export const deleteReply = ({
  no,
  replyNo,
}: EditAndDeleteParameterType): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).delete(
    `comments/${no}/replies/${replyNo}`,
  );
};
