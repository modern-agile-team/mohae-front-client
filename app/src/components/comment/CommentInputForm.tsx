import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import useResizeTextArea from '../../customhook/useResizeTextArea';
import Img from '../img/Img';
import { createComment } from '../../apis/comment';

const CommentInputForm = () => {
  const [comment, setComment] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resizeTextArea = useResizeTextArea(textareaRef);

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await createComment({ no: 4, body: { content: comment } });
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <CommentCounter>
        <span>댓글</span>
        <span>({`${5}`})</span>
      </CommentCounter>
      <FormContainer>
        <textarea
          ref={textareaRef}
          onKeyUp={resizeTextArea}
          onChange={handleChangeComment}
          placeholder="댓글을 입력해 주세요. (최대 500자)"
          value={comment}
        />
        <button type="button" onClick={handleSubmit}>
          작성
          <ImageContainer>
            <Img src="/img/write.png" />
          </ImageContainer>
        </button>
      </FormContainer>
    </Wrapper>
  );
};

export default CommentInputForm;

const Wrapper = styled.section``;

const CommentCounter = styled.div`
  border-bottom: 1px solid #e7e7e8;
  padding-bottom: 16px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-top: 16px;
  textarea {
    width: 100%;
    padding: 16px;
    background: #ffffff;
    box-shadow: inset 0px 0px 8px rgba(132, 131, 141, 0.2);
    border-radius: 6px;
    margin-bottom: 16px;
  }
  button {
    display: flex;
    align-items: center;
    background: #e7e7e8;
    box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
    border-radius: 6px;
    padding: 12px 25px;
    color: #fff;
    font-weight: bold;
  }
`;

const ImageContainer = styled.div`
  margin-left: 8px;
  height: 15px;
  width: 15px;
`;
