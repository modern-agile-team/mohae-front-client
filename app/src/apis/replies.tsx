import { AxiosResponse } from 'axios';
import {
  EditAndDeleteParameterType,
  PostParameterType,
} from '../types/replies/type';
import setInterceptors from './common/setInterceptors';
import { customAxios } from './instance';

const createReply = ({
  no,
  body,
}: PostParameterType): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).post(`comments/${no}/replies`, body);
};

const editReply = ({
  no,
  replyNo,
  body,
}: EditAndDeleteParameterType): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).put(
    `comments/${no}/replies/${replyNo}`,
    body,
  );
};

const deleteReply = ({
  no,
  replyNo,
}: EditAndDeleteParameterType): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).delete(
    `comments/${no}/replies/${replyNo}`,
  );
};

export { createReply, editReply, deleteReply };
