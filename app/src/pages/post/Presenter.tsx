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
  const scrollY = useScroll().scrollY;

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

  const createQuickMenu = () => {
    if (!response.authorization) return;
    return (
      scrollY > 490 && (
        <QuickMenuWrapper>
          <QuickMenu />
        </QuickMenuWrapper>
      )
    );
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
      {createQuickMenu()}
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

const QuickMenuWrapper = styled.div`
  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translate3d(0, -8px, 0);
    }
    100% {
      opacity: 1;
      transform: translateZ(0);
    }
  }
  position: fixed;
  top: 59px;
  animation: fadeInDown 1s;
`;

const PostClosingButtonWrap = styled.div`
  margin: 16px;
  width: 100px;
  height: 43px;
  margin-left: 1028px;
  margin-bottom: 64px;
`;
