import React from 'react';
import styled from '@emotion/styled';
import { Box, TextEditor } from '../../../../components';

function PostBody() {
  return (
    <Wrapper>
      <Box size={[1128, 397]} className="body">
        <TextEditor size={379} />
      </Box>
    </Wrapper>
  );
}

export default PostBody;

const Wrapper = styled.div`
  margin: 32px 0px 64px 0px;
  .body {
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
