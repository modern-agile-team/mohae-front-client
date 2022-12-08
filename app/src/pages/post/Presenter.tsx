import React from 'react';
import styled from '@emotion/styled';
import { Mosaic, Comment, MainButton } from '../../components';
import {
  PostImgs,
  PostInfo,
  QuickMenu,
  PostBody,
  PostWriter,
  Summary,
} from './component';
import useScroll from '../../customhook/useScroll';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import { PresenterProps } from '../../types/post/type';
import { handlePopup } from '../../redux/modal/reducer';

function Presenter(props: PresenterProps) {
  const { requestHandleDeadline } = props;
  const dispatch = useDispatch();
  const { response, userNo } = useSelector((state: RootState) => ({
    response: state.post.data.response,
    userNo: state.user.user.userNo,
  }));

  const popupText = () => {
    const date = new Date().toISOString();
    if (response.board.endDate && response.board.endDate < date) {
      return '작성 시에 설정하신 기간이 지난 후에는 불가합니다.';
    }
    if (response.board.isDeadline) {
      return '마감 취소 되었습니다.';
    } else {
      return '마감 되었습니다.';
    }
  };

  const requestPostClosing = () => {
    requestHandleDeadline(response.board);
    dispatch(handlePopup({ text: popupText() }));
  };

  return (
    <>
      <Wrapper>
        <div className="topflexWrap">
          <PostImgs />
          <div className="sectionWrap">
            <PostInfo />
            <PostWriter />
            <Summary />
          </div>
        </div>
        <PostBody />
        <Comment />
        {userNo === response.board.userNo && (
          <PostClosingButtonWrap onClick={requestPostClosing}>
            <MainButton type="button" able={true}>
              {response.board.isDeadline ? '마감 취소' : '마감 하기'}
            </MainButton>
          </PostClosingButtonWrap>
        )}
      </Wrapper>
      <QuickMenu />
      {!response.authorization && <Mosaic />}
    </>
  );
}

export default Presenter;

const Wrapper = styled.main`
  margin-top: 40px;
  .topflexWrap {
    display: flex;
    justify-content: space-between;
  }
  .comments-box {
    padding: 16px 24px 24px 24px;
    margin-bottom: 16px;
  }
`;

const PostClosingButtonWrap = styled.div`
  margin: 16px;
  width: 100px;
  height: 43px;
  margin-left: 1028px;
  margin-bottom: 64px;
`;
