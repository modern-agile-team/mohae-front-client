import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCommentList } from '../../apis/comment';
import { setCommentArr } from '../../redux/comment/reducer';
import Box from '../box/Box';
import CommentInputForm from './CommentInputForm';
import CommentList from './CommentList';

function Comment() {
  const { no } = useParams();
  const dispatch = useDispatch();

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
      <CommentList />
    </Box>
  );
}

export default Comment;

const BtnImgWrapper = styled.div`
  width: 74px;
  height: 43px;
`;
