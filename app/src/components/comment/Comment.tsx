import styled from '@emotion/styled';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import{ useParams } from 'react-router-dom';
import { getCommentList } from '../../apis/comment';
import { setCommentArr } from '../../redux/comment/reducer';
import Box from '../box/Box';
import { Btn } from '../button';
import { ReportModal } from '../modal';
import Popup from '../popup/Popup';
import CommentInputForm from './CommentInputForm';
import CommentList from './CommentList';

export interface Replies {
  replyNo: number;
  replyContent: string;
  replyWriterNo: number;
  replyWriterPhotoUrl: string;
  replyCreatedAt: string;
}

export interface CommentList {
  commentContent: string;
  commentCreatedAt: string;
  commentNo: number;
  commenterNickname: string;
  commenterNo: number;
  commenterPhotoUrl: string;
  isCommenter: number;
  replies: Replies[];
}

const Comment = () => {
  const [view, setView] = useState<{ [key: string]: boolean }>({
    report: false,
    popup: false,
  });
  const { no } = useParams();
  const dispatch = useDispatch();
  const buttonRef = useRef<HTMLButtonElement>(null);
  useLayoutEffect(() => {
    if (buttonRef.current !== null) buttonRef.current.focus();
  });

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
      <ReportModal
        visible={view.report}
        close={() => handleModalView('report')}
        user
      />
      {view.popup && (
        <>
          <Popup
            visible={view.popup}
            text1={'댓글이 작성 되었습니다.'}
            overlay={() => handleModalView('popup')}
          >
            <BtnImgWrapper>
              <Btn
                ref={buttonRef}
                main
                onClick={() => handleModalView('popup')}
              >
                닫기
              </Btn>
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

const Overlay = styled.div`
  position: fixed;
  /* top: 0;
  left: 0; */
  width: 100%;
  height: 100%;
  background-color: inherit;
`;
