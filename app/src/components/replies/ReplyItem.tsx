import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import Replier from './Replier';
import Profile from '../profile/Profile';
import { ReplyItemProps } from '../../types/replies/type';
import { useState } from 'react';
import ReplyInput from '../input/comment/CommentInput';
import { editReply } from '../../apis/replies';
import { setCommentArr } from '../../redux/comment/reducer';

const ReplyItem = (props: ReplyItemProps) => {
  const { commentIndex, handleModalView, replyIndex } = props;
  const commentArr = useSelector((state: RootState) => state.comment.data);
  const {
    replyContent,
    replyCreatedAt,
    replyWriterPhotoUrl,
    replyWriterNo,
    replyNo,
  } = useSelector(
    (state: RootState) => state.comment.data[commentIndex].replies[replyIndex],
  );
  const dispatch = useDispatch();
  const [editingReply, setEditingingReply] = useState<{
    willEdit: boolean;
    value: string;
  }>({
    willEdit: false,
    value: replyContent,
  });

  const handleEditingButton = () => {
    setEditingingReply(prev => {
      if (prev.willEdit) {
        return { willEdit: !prev.willEdit, value: replyContent };
      } else {
        return { willEdit: !prev.willEdit, value: prev.value };
      }
    });
  };

  const newRepliesArr = () => {
    const newCommentArr = commentArr.filter((_, i) => {
      return i !== commentIndex;
    });

    const newReplyArr = commentArr[commentIndex].replies.map((el, _) => {
      return el.replyNo === replyNo
        ? { ...el, replyContent: editingReply.value }
        : { ...el };
    });

    newCommentArr.splice(commentIndex, 0, {
      ...commentArr[commentIndex],
      replies: newReplyArr,
    });

    return newCommentArr;
  };

  const handleOnChangeForEditing = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEditingingReply(prev => {
      return { ...prev, value: e.target.value };
    });
  };

  const handleOnSubmit = async () => {
    try {
      await editReply({
        no: commentArr[commentIndex].commentNo,
        replyNo: replyNo,
        body: {
          content: editingReply.value,
        },
      }).then(_ => {
        handleEditingButton();
        dispatch(setCommentArr(newRepliesArr()));
      });
    } catch (err) {
      console.log(err);
    }
  };

  const profileImg = replyWriterPhotoUrl
    ? 'https://d2ffbnf2hpheay.cloudfront.net/' + replyWriterPhotoUrl
    : '/img/profile.png';

  return (
    <Wrapper>
      <ProfileImageWrapper>
        <Profile
          img={profileImg}
          size={45}
          userNumber={replyWriterNo}
          smallShadow
        />
      </ProfileImageWrapper>
      <ReplySection>
        <Replier
          commentIndex={commentIndex}
          replyIndex={replyIndex}
          handleModalView={handleModalView}
          handleEditingButton={handleEditingButton}
        />
        <ReplyHeader>
          <span id="comment-created-date">{replyCreatedAt}</span>
          {!editingReply.willEdit ? (
            <p
              id="content"
              dangerouslySetInnerHTML={{
                __html: replyContent.replace(/\n/g, '<br />'),
              }}
            />
          ) : (
            <EditInputWrapper>
              <ReplyInput
                onChange={handleOnChangeForEditing}
                onSubmit={handleOnSubmit}
                value={editingReply.value}
                usedForEdit={true}
                handleClose={handleEditingButton}
              />
            </EditInputWrapper>
          )}
        </ReplyHeader>
      </ReplySection>
    </Wrapper>
  );
};

export default ReplyItem;

const Wrapper = styled.li`
  display: flex;
  margin: 16px 0;
`;

const ProfileImageWrapper = styled.div`
  margin-right: 12px;
`;

const ReplySection = styled.section`
  width: 100%;
`;

const ReplyHeader = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: #a7a7ad;
  }
  #content {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #4f4e5c;
  }
`;

const EditInputWrapper = styled.div`
  width: 964px;
`;
