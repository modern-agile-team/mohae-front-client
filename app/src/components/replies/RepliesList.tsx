import { RepliesListProps } from '../../types/replies/type';
import ReplyItem from './ReplyItem';

const RepliesList = (props: RepliesListProps) => {
  const { commentIndex, handleModalView, replies } = props;

  return (
    <ul>
      {replies.map((_, i) => {
        return (
          <ReplyItem
            key={i}
            commentIndex={commentIndex}
            replyIndex={i}
            handleModalView={handleModalView}
          />
        );
      })}
    </ul>
  );
};

export default RepliesList;
