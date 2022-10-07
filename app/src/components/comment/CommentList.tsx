import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import { CommentListProps } from '../../types/comment/type';
import CommentItem from './CommentItem';

const CommentList = (props: CommentListProps) => {
  const { handleModalView, handlePopupView } = props;
  const commentList = useSelector((state: RootState) => state.comment.data);

  return (
    <ul>
      {commentList.map((_, i) => {
        return (
          <CommentItem
            key={i}
            commentIndex={i}
            handleModalView={handleModalView}
            handlePopupView={handlePopupView}
          />
        );
      })}
    </ul>
  );
};

export default CommentList;
