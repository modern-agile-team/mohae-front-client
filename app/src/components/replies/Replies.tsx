import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import Img from '../img/Img';
import RepliesList from './RepliesList';
import RepliesInputForm from './RepliesInputForm';
import { RepliesCommonProps as RepliesProps } from '../../types/replies/type';

function Replies(props: RepliesProps) {
  const { commentIndex } = props;
  const [repliesView, setRepliesView] = useState(false);
  const replies = useSelector(
    (state: RootState) => state.comment.data[commentIndex].replies,
  );

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
            <RepliesInputForm commentIndex={commentIndex} />
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
