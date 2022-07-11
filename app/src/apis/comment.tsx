import instance from './instance';

export const getCommentList = (no: number) => {
  return instance.get(`/board/${no}/comments`);
};

type postCommentType = {
  no: number;
  body: {
    content: string;
  };
};
export const createComment = ({ no, body }: postCommentType) => {
  return instance.post(`/board/${no}/comments`, body);
};
