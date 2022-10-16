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
        <div
          className="summary-container"
          dangerouslySetInnerHTML={{
            __html: summary ? summary.replace(/\n/g, '<br/>') : '',
          }}
        />
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
    overflow-y: ${props => (props.summary ? 'scroll' : 'auto')};
  }
`;
