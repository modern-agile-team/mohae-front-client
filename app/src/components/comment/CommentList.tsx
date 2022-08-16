import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import CommentItem from './CommentItem';

interface Props {
  handleModalView: () => void;
  handlePopupView: () => void;
}

const CommentList = (props: Props) => {
  const { handleModalView, handlePopupView } = props;
  const commentList = useSelector((state: RootState) => state.comment.data);

  return (
    <ul>
      {commentList.map((comment, i) => {
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
