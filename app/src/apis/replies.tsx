import setInterceptors from './common/setInterceptors';
import { customAxios } from './instance';

interface postReplyType {
  no: number;
  body?: {
    content: string;
  };
}

interface EditDeleteReply extends postReplyType {
  replyNo: number;
}

export const createReply = ({ no, body }: postReplyType) => {
  return setInterceptors(customAxios).post(`comments/${no}/replies`, body);
};

export const editReply = (
  no: number,
  replyNo: number,
  body: EditDeleteReply,
) => {
  return setInterceptors(customAxios).put(
    `comments/${no}/replies/${replyNo}`,
    body,
  );
};

export const deleteReply = ({ no, replyNo }: EditDeleteReply) => {
  return setInterceptors(customAxios).delete(
    `comments/${no}/replies/${replyNo}`,
  );
};
