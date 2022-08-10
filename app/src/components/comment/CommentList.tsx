import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCommentList } from '../../apis/comment';
import CommentItem from './CommentItem';

interface Replies {
  replyNo: number;
  replyContent: string;
  replyWriterNo: number;
  replyWriterPhotoUrl: string;
  replyCreatedAt: string;
}

export interface CommentList {
  commentContent: string;
  commentCreatedAt: string;
  commentNo: number;
  commenterNickname: string;
  commenterNo: number;
  commenterPhotoUrl: string;
  isCommenter: number;
  replies: Replies[];
}

interface Props {
  handleModalView: () => void;
}

const CommentList = (props: Props) => {
  const { handleModalView } = props;
  const [commentList, setCommentList] = useState<CommentList[]>([]);
  const { no } = useParams();

  const getComments = async () => {
    const response = await getCommentList(Number(no));
    setCommentList(response.data.response);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <ul>
      {commentList.map(comment => {
        return <CommentItem {...comment} handleModalView={handleModalView} />;
      })}
    </ul>
  );
};

export default CommentList;
