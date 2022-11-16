import { RepliesListProps } from '../../types/replies/type';
import ReplyItem from './ReplyItem';

const RepliesList = (props: RepliesListProps) => {
  const { commentIndex, replies } = props;

  return (
    <ul>
      {replies.map((_, i) => {
        return <ReplyItem key={i} commentIndex={commentIndex} replyIndex={i} />;
      })}
    </ul>
  );
};

export default RepliesList;
