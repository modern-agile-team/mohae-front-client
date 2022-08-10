import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import useResizeTextArea from '../../customhook/useResizeTextArea';
import Img from '../img/Img';
import { createComment } from '../../apis/comment';
import { Btn } from '../button';
import { color, font } from '../../styles';
import { useParams } from 'react-router-dom';

const CommentInputForm = () => {
  const [comment, setComment] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resizeTextArea = useResizeTextArea(textareaRef);
  const { no } = useParams();

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await createComment({ no: Number(no), body: { content: comment } }).then(
        res => console.log('res', res),
      );
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
        <div className="write-btn">
          <Btn main onClick={handleSubmit}>
            <p>작성</p>
            <div className="write-img">
              <Img src="/img/write.png" />
            </div>
          </Btn>
        </div>
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
    background: ${color.main};
    box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
    border-radius: 6px;
    padding: 12px 25px;
    color: #fff;
    font-weight: bold;
  }
`;
