import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import CommentItem from './CommentItem';

const CommentList = () => {
  const commentList = useSelector((state: RootState) => state.comment.data);

  return (
    <ul>
      {commentList.map((_, i) => {
        return <CommentItem key={i} commentIndex={i} />;
      })}
    </ul>
  );
};

export default CommentList;
