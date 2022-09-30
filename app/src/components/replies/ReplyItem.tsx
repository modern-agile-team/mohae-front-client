import styled from '@emotion/styled';
import Img from '../img/Img';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import Replier from './Replier';
import Profile from '../profile/Profile';

interface DefaultProps {
  handleModalView: () => void;
  commentIndex: number;
  replyIndex: number;
}

const ReplyItem = (props: DefaultProps) => {
  const { commentIndex, handleModalView, replyIndex } = props;
  const { replyContent, replyCreatedAt, replyWriterPhotoUrl, replyWriterNo } =
    useSelector(
      (state: RootState) =>
        state.comment.data[commentIndex].replies[replyIndex],
    );
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
      <CommentSection>
        <Replier
          commentIndex={commentIndex}
          replyIndex={replyIndex}
          handleModalView={handleModalView}
        />
        <CommentHeader>
          <span id="comment-created-date">{replyCreatedAt}</span>
          <p
            dangerouslySetInnerHTML={{
              __html: replyContent.replace(/\n/g, '<br />'),
            }}
          />
        </CommentHeader>
      </CommentSection>
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
