import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import useResizeTextArea from '../../customhook/useResizeTextArea';
import Img from '../img/Img';
import { Btn } from '../button';
import { color } from '../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { setCommentArr } from '../../redux/comment/reducer';
import { RootState } from '../../redux/root';
import { Replies } from '../comment/Comment';
import { createReply } from '../../apis/replies';

interface Props {
  commentIndex: number;
  handlePopupView: () => void;
}

const RepliesInputForm = (props: Props) => {
  const { handlePopupView, commentIndex } = props;
  const [reply, setReply] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resizeTextArea = useResizeTextArea(textareaRef);
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user.user);
  const day = new Date();
  const today = {
    year: day.getFullYear(),
    month: day.getMonth() + 1,
    date: day.getDate(),
  };
  const comments = useSelector((state: RootState) => state.comment.data);
  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
  };

  const addNewRelpy = (newReply: Replies) => {
    const newCommentArr = comments.filter((el, i) => {
      return i !== commentIndex;
    });

    newCommentArr.splice(commentIndex, 0, {
      ...comments[commentIndex],
      replies: [...comments[commentIndex].replies, newReply],
    });

    return newCommentArr;
  };

  const handleSubmit = async () => {
    try {
      await createReply({
        no: comments[commentIndex].commentNo,
        body: { content: reply },
      }).then(res => {
        const newReply = {
          replyNo: 1,
          replyContent: reply,
          replyWriterNo: userInfo.userNo || 1,
          replyWriterPhotoUrl: userInfo.photo_url || null,
          replyCreatedAt: `${today.year}년 ${
            today.month >= 10 ? today.month : '0' + today.month
          }월 ${today.date >= 10 ? today.date : '0' + today.date}일`,
        };
        dispatch(setCommentArr(addNewRelpy(newReply)));
        handlePopupView();
      });
      setReply('');
    } catch (err) {
      console.log(err);
    }
  };

  const onClickToWrite = () => {
    if (reply.length) {
      return handleSubmit();
    }
  };

  return (
    <Wrapper>
      <FormContainer>
        <textarea
          ref={textareaRef}
          onKeyUp={resizeTextArea}
          onChange={handleChangeComment}
          placeholder="댓글을 입력해 주세요."
          value={reply}
        />
        <div className="write-btn">
          <Btn main onClick={onClickToWrite}>
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

export default RepliesInputForm;

const Wrapper = styled.section``;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-top: 16px;
  width: 1024px;
  textarea {
    width: 100%;
    padding: 16px;
    background: #ffffff;
    box-shadow: inset 0px 0px 8px rgba(132, 131, 141, 0.2);
    border-radius: 6px;
    margin-bottom: 16px;
  }
  .write-btn {
    background: ${color.main};
    border-radius: 6px;
    font-weight: bold;
    box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
    p {
      color: white;
    }
  }
`;
