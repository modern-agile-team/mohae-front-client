import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import useResizeTextArea from '../../../customhook/useResizeTextArea';
import Img from '../../img/Img';
import { CommentInputProps } from '../../../types/comment/type';

function CommentInput(props: CommentInputProps) {
  const {
    onChange,
    onSubmit,
    value,
    usedForEdit,
    handleClose,
    errorState,
    errorMessage,
  } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resizeTextArea = useResizeTextArea(textareaRef);

  useEffect(() => {
    resizeTextArea();
  }, []);

  return (
    <>
      <FormContainer errorState={errorState}>
        {errorState && (
          <ErrorMessage id="error-message">{errorMessage}</ErrorMessage>
        )}
        <StyledTextArea
          ref={textareaRef}
          onKeyUp={resizeTextArea}
          onChange={onChange}
          placeholder="댓글을 입력해 주세요. (최대 500자)"
          value={value}
        />
        <ButtonsWrapper className="write-btn">
          <StyledButton background="#ff445e" type="submit" onClick={onSubmit}>
            <p>작성</p>
            <div className="write-img">
              <Img id="img" src="/img/write.png" />
            </div>
          </StyledButton>
          {usedForEdit && (
            <StyledButton background="#fff" onClick={handleClose}>
              <p>취소</p>
            </StyledButton>
          )}
        </ButtonsWrapper>
      </FormContainer>
    </>
  );
}

export default CommentInput;

const FormContainer = styled.div<{ errorState: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-top: ${props => (!props.errorState ? '24px' : '0px')};
  width: 100%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 8px;
  .write-img {
    width: 15px;
    height: 15px;
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 16px;
  background: #ffffff;
  box-shadow: inset 0px 0px 8px rgba(132, 131, 141, 0.2);
  border-radius: 6px;
  margin-bottom: 16px;
  overflow-y: hidden;
`;

const StyledButton = styled.button<{ background: string }>`
  min-width: 100px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: ${props => props.background};
  color: ${props => (props.background === '#fff' ? '#ff445e' : '#fff')};
  box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
  border-radius: 6px;
  padding: 12px 26px;
`;

const ErrorMessage = styled.p`
  font-size: 12px;
  font-family: 'Bold';
  color: red;
  width: 100%;
  height: 24px;
  padding-bottom: 4px;
  vertical-align: middle;
`;
