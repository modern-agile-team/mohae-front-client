import React from 'react';
import { Box } from '../../../../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/root';
import styled from '@emotion/styled';

function PostBody() {
  const { board, authorization } = useSelector(
    (state: RootState) => state.post.data.response,
  );

  const descriptionBoxContent = () => {
    if (authorization && board.description) {
      return board.description;
    } else return '게시글 상세 조회는 로그인을 하고 이용 하시길 바랍니다.';
  };

  return (
    <Container>
      <Box size={[1128, 397]} className="body">
        <div className="description-scrollBox">
          <div
            className="description-box"
            dangerouslySetInnerHTML={{
              __html: descriptionBoxContent(),
            }}
          />
        </div>
      </Box>
    </Container>
  );
}

export default PostBody;

const Container = styled.section`
  margin: 32px 0px 16px 0px;
  .body {
    padding: 16px 0px 16px 24px;
    font-size: 14px;
    font-family: 'Regular';
    word-break: break-all;
    .rdw-editor-main {
      height: 349px !important;
      padding: 0px !important;
    }
    .DraftEditor-editorContainer {
      padding: 6px;
    }
  }

  .description-scrollBox {
    width: 1080px;
    height: 365px;
    overflow-y: auto;
  }
  .description-box {
    height: fit-content;
  }
`;
