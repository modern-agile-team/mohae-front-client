import styled from '@emotion/styled';
import React, { useState } from 'react';
import { createComment } from '../../apis/comment';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAddCommentArr } from '../../redux/comment/reducer';
import { RootState } from '../../redux/root';
import CommentInput from '../input/comment/CommentInput';
import { ErrorState } from '../../types/comment/type';
import { handlePopup } from '../../redux/modal/reducer';

function CommentInputForm() {
  const [comment, setComment] = useState<string>('');
  const { no } = useParams();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user.user);
  const commentList = useSelector((state: RootState) => state.comment.data);
  const [errorState, setErrorState] = useState<ErrorState>({
    message: '댓글 작성에 실패하였습니다.',
    errorOccurred: false,
  });

  const handleErrorState = (occurs: boolean) => {
    setErrorState(prev => {
      return { ...prev, errorOccurred: occurs };
    });
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const day = new Date();
  const today = {
    year: day.getFullYear(),
    month: day.getMonth() + 1,
    date: day.getDate(),
  };

  const handleSubmit = async () => {
    if (0 < comment.length && comment.length < 500) {
      try {
        await createComment({
          no: Number(no),
          body: { content: comment },
        }).then(_ => {
          const newComment = {
            commentContent: comment,
            commentCreatedAt: `${today.year}년 ${
              today.month >= 10 ? today.month : '0' + today.month
            }월 ${today.date >= 10 ? today.date : '0' + today.date}일`,
            commentNo: 1,
            commenterNickname: userInfo?.nickname,
            commenterNo: userInfo?.userNo,
            commenterPhotoUrl: userInfo?.photo_url || null,
            isCommenter: 1,
            replies: [],
          };
          dispatch(setAddCommentArr(newComment));
          dispatch(handlePopup({ text: '댓글이 작성 되었습니다.' }));
          handleErrorState(false);
        });
        setComment('');
      } catch (err) {
        alert('알 수 없는 에러가 발생하였습니다.');
      }
    } else handleErrorState(true);
  };

  return (
    <Wrapper>
      <CommentCounter>
        <span>댓글</span>
        <span>({commentList.length})</span>
      </CommentCounter>
      <CommentInput
        onSubmit={handleSubmit}
        onChange={handleChangeComment}
        value={comment}
        usedForEdit={false}
        errorMessage={errorState.message}
        errorState={errorState.errorOccurred}
      />
    </Wrapper>
  );
}

export default CommentInputForm;

const Wrapper = styled.section``;

const CommentCounter = styled.div`
  border-bottom: 1px solid #e7e7e8;
  padding-bottom: 16px;
`;
