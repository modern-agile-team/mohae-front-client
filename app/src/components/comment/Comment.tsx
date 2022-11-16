import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCommentList } from '../../apis/comment';
import { setCommentArr } from '../../redux/comment/reducer';
import { handlePopup } from '../../redux/modal/reducer';
import Box from '../box/Box';
import { MainButton } from '../button';
import CommentInputForm from './CommentInputForm';
import CommentList from './CommentList';

function Comment() {
  const { no } = useParams();
  const dispatch = useDispatch();
  const closePopup = () => dispatch(handlePopup());
  const popupContents = {
    text: '댓글이 작성 되었습니다.',
    children: (
      <BtnImgWrapper>
        <MainButton type="button" able={true} onClick={closePopup}>
          닫기
        </MainButton>
      </BtnImgWrapper>
    ),
  };

  const getComments = async () => {
    const response = await getCommentList(Number(no));
    dispatch(setCommentArr(response.data.response));
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Box size={[1128]} className="comments-box">
      <CommentInputForm popupContents={popupContents} />
      <CommentList />
    </Box>
  );
}

export default Comment;

const BtnImgWrapper = styled.div`
  width: 74px;
  height: 43px;
`;
