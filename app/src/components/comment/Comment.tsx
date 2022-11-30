import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCommentList } from '../../apis/comment';
import { setCommentArr } from '../../redux/comment/reducer';
import { RootState } from '../../redux/root';
import CommentInputForm from './CommentInputForm';
import CommentItem from './CommentItem';
import Box from '../box/Box';

function Comment() {
  const { no } = useParams();
  const dispatch = useDispatch();
  const commentList = useSelector((state: RootState) => state.comment.data);

  const getComments = async () => {
    const response = await getCommentList(Number(no));
    dispatch(setCommentArr(response.data.response));
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Box size={[1128]} className="comments-box">
      <CommentInputForm />
      <ul>
        {commentList.map((_, i) => {
          return <CommentItem key={i} commentIndex={i} />;
        })}
      </ul>
    </Box>
  );
}

export default Comment;
