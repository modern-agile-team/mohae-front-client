import instance from './instance';

type postCommentType = {
  no: number;
  body: {
    content: string;
  };
};
export const createComment = ({ no, body }: postCommentType) => {
  return instance.post(`/board/${no}/comments`, body);
};
