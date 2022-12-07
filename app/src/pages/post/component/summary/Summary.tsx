import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { PostIt } from '../../../../components';
import { RootState } from '../../../../redux/root';

function Summary() {
  const { summary } = useSelector(
    (state: RootState) => state.post.data.response.board,
  );

  return (
    <PostItWrapper summary={summary}>
      <PostIt size="small">
        <label>
          <textarea
            className="summary-container"
            defaultValue={
              summary ? summary : '한 줄 요약이 존재 하지 않습니다.'
            }
            disabled
          />
        </label>
      </PostIt>
    </PostItWrapper>
  );
}

export default Summary;

const PostItWrapper = styled.div<{ summary: string | null }>`
  margin-top: 24px;
  .summary-container {
    width: 704px;
    height: 127px;
    background-color: white;
    font-size: 14px;
    padding-top: 4px;
    overflow-y: auto;
  }
`;
