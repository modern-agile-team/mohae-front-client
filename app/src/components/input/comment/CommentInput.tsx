import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import useResizeTextArea from '../../../customhook/useResizeTextArea';
import Img from '../../img/Img';
import { CommentInputProps } from '../../../types/comment/type';
import { MainButton, WhiteButton } from '../../button';

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
          <div className="button-wrap">
            <MainButton able={true} type="submit" onClick={onSubmit}>
              <p>작성</p>
              <div className="write-img">
                <Img id="img" src="/img/write.png" alt="comment-write" />
              </div>
            </MainButton>
          </div>
          {usedForEdit && (
            <div className="button-wrap">
              <WhiteButton able={true} type="button" onClick={handleClose}>
                <p>취소</p>
              </WhiteButton>
            </div>
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
  .button-wrap {
    min-width: 100px;
    height: 43px;
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

const ErrorMessage = styled.p`
  font-size: 12px;
  font-family: 'Bold';
  color: red;
  width: 100%;
  height: 24px;
  padding-bottom: 4px;
  vertical-align: middle;
`;
