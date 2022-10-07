import { AxiosResponse } from 'axios';
import {
  EditAndDeleteParameterType,
  PostParameterType,
} from '../types/comment/type';
import setInterceptors from './common/setInterceptors';
import { customAxios } from './instance';

export const getCommentList = (no: number): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).get(`/board/${no}/comments`);
};

export const createComment = ({
  no,
  body,
}: PostParameterType): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).post(`/board/${no}/comments`, body);
};

export const editComment = (
  no: number,
  commentNo: number,
  body: EditAndDeleteParameterType,
): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).put(
    `/board/${no}/comments/${commentNo}`,
    body,
  );
};

export const deleteComment = ({
  no,
  commentNo,
}: EditAndDeleteParameterType): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).delete(
    `/board/${no}/comments/${commentNo}`,
  );
};
