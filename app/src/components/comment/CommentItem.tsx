import styled from '@emotion/styled';
import Commenter from './Commenter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import Replies from '../replies/Replies';
import Profile from '../profile/Profile';
import { CommentItemProps } from '../../types/comment/type';
import React, { useState } from 'react';
import CommentInput from '../input/comment/CommentInput';
import { editComment } from '../../apis/comment';
import { useParams } from 'react-router-dom';
import { setCommentArr } from '../../redux/comment/reducer';

const CommentItem = (props: CommentItemProps) => {
  const { commentIndex, handleModalView, handlePopupView } = props;
  const {
    commentContent,
    commenterPhotoUrl,
    commentCreatedAt,
    commenterNo,
    commentNo,
  } = useSelector((state: RootState) => state.comment.data[commentIndex]);
  const commentArr = useSelector((state: RootState) => state.comment.data);
  const { no } = useParams();
  const dispatch = useDispatch();
  const [editingComment, setEditingingComment] = useState<{
    willEdit: boolean;
    value: string;
  }>({
    willEdit: false,
    value: commentContent,
  });

  const profileImg =
    commenterPhotoUrl !== null
      ? 'https://d2ffbnf2hpheay.cloudfront.net/' + commenterPhotoUrl
      : commenterPhotoUrl;

  const handleEditingButton = () => {
    setEditingingComment(prev => {
      if (prev.willEdit) {
        return { willEdit: !prev.willEdit, value: commentContent };
      } else {
        return { willEdit: !prev.willEdit, value: prev.value };
      }
    });
  };

  const handleOnChangeForEditing = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEditingingComment(prev => {
      return { ...prev, value: e.target.value };
    });
  };

  const handleOnSubmit = async () => {
    handleEditingButton();
    try {
      await editComment({
        no: Number(no),
        commentNo: commentNo,
        body: {
          content: editingComment.value,
        },
      }).then(_ => {
        const newCommentArr = commentArr.map((el, i) => {
          if (el.commentNo === commentNo) {
            return { ...el, commentContent: editingComment.value };
          } else return { ...el };
        });
        dispatch(setCommentArr(newCommentArr));
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(commentArr);
  console.log(editingComment.value);

  return (
    <Wrapper>
      <ProfileImageWrapper>
        <Profile
          img={profileImg}
          size={45}
          userNumber={commenterNo}
          smallShadow
        />
      </ProfileImageWrapper>
      <CommentSection>
        <CommentHeader>
          <Commenter
            handleEditingButton={handleEditingButton}
            commentIndex={commentIndex}
            handleModalView={handleModalView}
          />
          <span id="comment-created-date">{commentCreatedAt}</span>
          {!editingComment.willEdit ? (
            <p
              dangerouslySetInnerHTML={{
                __html: commentContent.replace(/\n/g, '<br />'),
              }}
            />
          ) : (
            <EditInputWrapper>
              <CommentInput
                value={editingComment.value}
                usedForEdit={true}
                onSubmit={handleOnSubmit}
                onChange={handleOnChangeForEditing}
                handleClose={handleEditingButton}
              />
            </EditInputWrapper>
          )}
        </CommentHeader>
        <Replies
          commentIndex={commentIndex}
          handleModalView={handleModalView}
          handlePopupView={handlePopupView}
        />
      </CommentSection>
    </Wrapper>
  );
};

export default CommentItem;

const Wrapper = styled.li`
  display: flex;
  margin: 16px 0;
`;

const ProfileImageWrapper = styled.div`
  margin-right: 12px;
  cursor: pointer;
`;

const CommentSection = styled.section`
  width: 100%;
`;

const CommentHeader = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: #a7a7ad;
  }
`;

const EditInputWrapper = styled.div`
  width: 1023px;
`;
