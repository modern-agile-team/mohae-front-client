import styled from '@emotion/styled';
import Img from '../img/Img';
import Commenter from './Commenter';
import { CommentType } from './CommentList';

const CommentItem = (props: CommentType) => {
  const {
    commenterPhotoUrl,
    commenterNickname,
    commentCreatedAt,
    commentContent,
    replies,
  } = props;

  return (
    <Wrapper>
      <ProfileImageWrapper>
        <Img src={commenterPhotoUrl || '/img/profile.png'} size={45} />
      </ProfileImageWrapper>
      <CommentSection>
        <CommentHeader>
          <Commenter commenterNickname={commenterNickname} />
          <span id="comment-created-date">{commentCreatedAt}</span>
        </CommentHeader>
        <CommentDescription>
          <p>{commentContent}</p>
          <span id="replies">답글</span>
          <span id="replies">({replies.length})</span>
        </CommentDescription>
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
  width: 45px;
  height: 45px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(132, 131, 141, 0.25);
  border-radius: 50px;
  margin-right: 12px;
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

const CommentDescription = styled.div`
  p {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #4f4e5c;
  }
  #replies {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #ff445e;
  }
`;
