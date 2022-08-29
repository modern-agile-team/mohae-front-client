import setInterceptors from './common/setInterceptors';
import { customAxios } from './instance';

interface postCommentType {
  no: number;
  body?: {
    content: string;
  };
}

interface EditDeleteComment extends postCommentType {
  commentNo: number;
}

export const getCommentList = (no: number) => {
  return setInterceptors(customAxios).get(`/board/${no}/comments`);
};

export const createComment = ({ no, body }: postCommentType) => {
  return setInterceptors(customAxios).post(`/board/${no}/comments`, body);
};

export const editComment = (
  no: number,
  commentNo: number,
  body: EditDeleteComment,
) => {
  return setInterceptors(customAxios).put(
    `/board/${no}/comments/${commentNo}`,
    body,
  );
};

export const deleteComment = ({ no, commentNo }: EditDeleteComment) => {
  return setInterceptors(customAxios).delete(
    `/board/${no}/comments/${commentNo}`,
  );
};
