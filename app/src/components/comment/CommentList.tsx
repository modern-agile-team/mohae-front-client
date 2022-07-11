import { useEffect, useState } from 'react';
import { getCommentList } from '../../apis/comment';

type CommentType = {
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
        return <li>{comment.commentContent}</li>;
      })}
    </ul>
  );
};

export default CommentList;
