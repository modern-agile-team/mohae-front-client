import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import Img from '../img/Img';
import RepliesList from './RepliesList';
import RepliesInputForm from './RepliesInputForm';
import { RepliesCommonProps as RepliesProps } from '../../types/replies/type';
import { MainButton } from '../button';
import { handlePopup } from '../../redux/modal/reducer';

function Replies(props: RepliesProps) {
  const { commentIndex } = props;
  const dispatch = useDispatch();
  const [repliesView, setRepliesView] = useState(false);
  const closePopup = () => dispatch(handlePopup());
  const replies = useSelector(
    (state: RootState) => state.comment.data[commentIndex].replies,
  );
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

  const handleOpener = () => {
    setRepliesView(prev => !prev);
  };

  return (
    <>
      <RepliesWrapper>
        <FlexWrapper onClick={handleOpener}>
          <span id="replies">답글</span>
          <span id="replies">({replies.length})</span>
          <div id="opener">
            <Img
              src={
                repliesView
                  ? '/img/arrow-down-main.png'
                  : '/img/arrow-up-main.png'
              }
            />
          </div>
        </FlexWrapper>
        {repliesView && (
          <>
            <RepliesList commentIndex={commentIndex} replies={replies} />
            <RepliesInputForm
              popupContents={popupContents}
              commentIndex={commentIndex}
            />
          </>
        )}
      </RepliesWrapper>
    </>
  );
}

export default Replies;

const RepliesWrapper = styled.div`
  #replies {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #ff445e;
    cursor: pointer;
  }
  #opener {
    width: 12px;
    height: 12px;
    cursor: pointer;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const BtnImgWrapper = styled.div`
  width: 74px;
  height: 43px;
`;
