import { AxiosResponse } from 'axios';
import {
  EditAndDeleteParameterType,
  PostParameterType,
} from '../types/comment/type';
import setInterceptors from './common/setInterceptors';
import { customAxios } from './instance';

const getCommentList = (no: number): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).get(`/board/${no}/comments`);
};

const createComment = ({
  no,
  body,
}: PostParameterType): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).post(`/board/${no}/comments`, body);
};

const editComment = ({
  no,
  commentNo,
  body,
}: EditAndDeleteParameterType): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).put(
    `/board/${no}/comments/${commentNo}`,
    body,
  );
};

const deleteComment = ({
  no,
  commentNo,
}: EditAndDeleteParameterType): Promise<AxiosResponse> => {
  return setInterceptors(customAxios).delete(
    `/board/${no}/comments/${commentNo}`,
  );
};

export { getCommentList, createComment, editComment, deleteComment };
