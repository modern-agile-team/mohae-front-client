import styled from '@emotion/styled';
import Img from '../img/Img';
import Commenter from './Commenter';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import Replies from '../replies/Replies';
import Profile from '../profile/Profile';
import { css, cx } from '@emotion/css';

interface DefaultProps {
  handleModalView: () => void;
  handlePopupView: () => void;
  commentIndex: number;
}

const CommentItem = (props: DefaultProps) => {
  const { commentIndex, handleModalView, handlePopupView } = props;
  const { commentContent, commenterPhotoUrl, commentCreatedAt, commenterNo } =
    useSelector((state: RootState) => state.comment.data[commentIndex]);
  const profileImg =
    commenterPhotoUrl !== null
      ? 'https://d2ffbnf2hpheay.cloudfront.net/' + commenterPhotoUrl
      : commenterPhotoUrl;
  console.log('commenterPhotoUrl :>> ', commenterPhotoUrl);

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
            commentIndex={commentIndex}
            handleModalView={handleModalView}
          />
          <span id="comment-created-date">{commentCreatedAt}</span>
          <p>{commentContent}</p>
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
