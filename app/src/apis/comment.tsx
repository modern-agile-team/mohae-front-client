import instance from './instance';

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
  return instance.get(`/board/${no}/comments`);
};

export const createComment = ({ no, body }: postCommentType) => {
  return instance.post(`/board/${no}/comments`, body);
};

export const editComment = (
  no: number,
  commentNo: number,
  body: EditDeleteComment,
) => {
  return instance.put(`/board/${no}/comments/${commentNo}`, body);
};

export const deleteComment = ({ no, commentNo }: EditDeleteComment) => {
  return instance.put(`/board/${no}/comments/${commentNo}`);
};
