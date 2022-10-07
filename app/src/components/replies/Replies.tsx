import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import Img from '../img/Img';
import RepliesList from './RepliesList';
import RepliesInputForm from './RepliesInputForm';
import { RepliesProps } from '../../types/replies/type';

function Replies(props: RepliesProps) {
  const { commentIndex, handleModalView, handlePopupView } = props;
  const replies = useSelector(
    (state: RootState) => state.comment.data[commentIndex].replies,
  );
  const [repliesView, setRepliesView] = useState(false);

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
            <RepliesList
              commentIndex={commentIndex}
              replies={replies}
              handleModalView={handleModalView}
            />
            <RepliesInputForm
              commentIndex={commentIndex}
              handlePopupView={handlePopupView}
            />
          </>
        )}
      </RepliesWrapper>
    </>
  );
}
const RepliesWrapper = styled.div`
  p {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #4f4e5c;
  }
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

export default Replies;
