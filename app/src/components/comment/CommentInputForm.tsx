import styled from '@emotion/styled';
import { useRef } from 'react';
import useResizeTextArea from '../../customhook/useResizeTextArea';

const CommentInputForm = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resizeTextArea = useResizeTextArea(textareaRef);

  return (
    <Wrapper>
      <CommentCounter>
        <p>댓글 (5)</p>
      </CommentCounter>
      <FormContainer>
        <textarea
          ref={textareaRef}
          onKeyUp={resizeTextArea}
          placeholder="댓글을 입력해 주세요. (최대 500자)"
        />
        <button type="submit">작성</button>
      </FormContainer>
    </Wrapper>
  );
};

export default CommentInputForm;

const Wrapper = styled.section``;

const CommentCounter = styled.div`
  border-bottom: 1px solid #e7e7e8;
  p {
    padding-bottom: 16px;
  }
`;

const FormContainer = styled.div`
  padding-top: 16px;
  textarea {
    width: 100%;
    padding: 16px;
    background: #ffffff;
    box-shadow: inset 0px 0px 8px rgba(132, 131, 141, 0.2);
    border-radius: 6px;
  }
`;
