import styled from '@emotion/styled';
import React, { useState } from 'react';
import ReplyInput from '../input/comment/CommentInput';
import { useDispatch, useSelector } from 'react-redux';
import { setCommentArr } from '../../redux/comment/reducer';
import { RootState } from '../../redux/root';
import {
  RepliesInputFromProps,
  ReplyList,
  ErrorState,
} from '../../types/replies/type';
import { createReply } from '../../apis/replies';
import { handlePopup } from '../../redux/modal/reducer';

function RepliesInputForm({
  commentIndex,
  popupContents,
}: RepliesInputFromProps) {
  const { text, children } = popupContents;
  const [reply, setReply] = useState<string>('');
  const [errorState, setErrorState] = useState<ErrorState>({
    message: '대댓글 작성에 실패하였습니다.',
    errorOccurred: false,
  });
  const handleErrorState = (occurs: boolean) => {
    setErrorState(prev => ({ ...prev, errorOccurred: occurs }));
  };
  const dispatch = useDispatch();
  const { userInfo, comments } = useSelector((state: RootState) => ({
    userInfo: state.user.user,
    comments: state.comment.data,
  }));

  const day = new Date();
  const today = {
    year: day.getFullYear(),
    month: day.getMonth() + 1,
    date: day.getDate(),
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
  };

  const addNewRelpy = (newReply: ReplyList) => {
    const newCommentArr = comments.filter((_, i) => {
      return i !== commentIndex;
    });

    newCommentArr.splice(commentIndex, 0, {
      ...comments[commentIndex],
      replies: [...comments[commentIndex].replies, newReply],
    });

    return newCommentArr;
  };

  const handleSubmit = async () => {
    if (0 < reply.length && reply.length < 500) {
      try {
        await createReply({
          no: comments[commentIndex].commentNo,
          body: { content: reply },
        }).then(_ => {
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
          dispatch(handlePopup({ text: text, children: children }));
        });
        setReply('');
        handleErrorState(false);
      } catch (err) {
        alert('알 수 없는 에러가 발생하였습니다.');
      }
    } else handleErrorState(true);
  };

  return (
    <Wrapper>
      <ReplyInputWrapper>
        <ReplyInput
          onSubmit={handleSubmit}
          onChange={handleChangeComment}
          value={reply}
          usedForEdit={false}
          errorMessage={errorState.message}
          errorState={errorState.errorOccurred}
        />
      </ReplyInputWrapper>
    </Wrapper>
  );
}

export default RepliesInputForm;

const Wrapper = styled.section``;

const ReplyInputWrapper = styled.div`
  width: 1024px;
`;
