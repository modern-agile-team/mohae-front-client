import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCommentList } from '../../apis/comment';
import { setCommentArr } from '../../redux/comment/reducer';
import Box from '../box/Box';
import { MainButton } from '../button';
import Popup from '../popup/Popup';
import CommentInputForm from './CommentInputForm';
import CommentList from './CommentList';

const Comment = () => {
  const [view, setView] = useState<{ [key: string]: boolean }>({
    report: false,
    popup: false,
  });
  const { no } = useParams();
  const dispatch = useDispatch();

  const handleModalView = (str: string) => {
    setView(prev => {
      return { ...prev, [str]: !view[str] };
    });
  };

  const getComments = async () => {
    const response = await getCommentList(Number(no));
    dispatch(setCommentArr(response.data.response));
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <Box size={[1128]} className="comments-box">
        <CommentInputForm handleModalView={() => handleModalView('popup')} />
        <CommentList
          handleModalView={() => handleModalView('report')}
          handlePopupView={() => handleModalView('popup')}
        />
      </Box>
      {view.popup && (
        <>
          <Popup
            visible={view.popup}
            text1={'댓글이 작성 되었습니다.'}
            overlay={() => handleModalView('popup')}
          >
            <BtnImgWrapper>
              <MainButton
                type="button"
                able={true}
                onClick={() => handleModalView('popup')}
              >
                닫기
              </MainButton>
            </BtnImgWrapper>
          </Popup>
        </>
      )}
    </>
  );
};

export default Comment;

const BtnImgWrapper = styled.div`
  width: 74px;
  height: 43px;
`;
