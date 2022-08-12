import ReplyItem from './ReplyItem';

interface Props {
  handleModalView: () => void;
  replies: object[];
  commentIndex: number;
}

const RepliesList = (props: Props) => {
  const { commentIndex, handleModalView, replies } = props;

  return (
    <ul>
      {replies.map((reply, i) => {
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
