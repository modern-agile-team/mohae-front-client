import { useEffect, useState } from 'react';
import { getCommentList } from '../../apis/comment';
import CommentItem from './CommentItem';

export type CommentType = {
  commentContent: string;
  commentCreatedAt: string;
  commentNo: number;
  commenterNickname: string;
  commenterNo: number;
  commenterPhotoUrl?: string;
  isCommenter: number;
  replies: any[];
};

const CommentList = () => {
  const [commentList, setCommentList] = useState<CommentType[]>([]);

  const getComments = async () => {
    const response = await getCommentList(4);
    setCommentList(response.data.response);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <ul>
      {commentList.map(comment => {
        return <CommentItem {...comment} />;
      })}
    </ul>
  );
};

export default CommentList;
