import styled from '@emotion/styled';
import Img from '../img/Img';
import Commenter from './Commenter';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import Replies from '../replies/Replies';

interface DefaultProps {
  handleModalView: () => void;
  handlePopupView: () => void;
  commentIndex: number;
}

const CommentItem = (props: DefaultProps) => {
  const { commentIndex, handleModalView, handlePopupView } = props;
  const { commentContent, commenterPhotoUrl, commentCreatedAt } = useSelector(
    (state: RootState) => state.comment.data[commentIndex],
  );

  return (
    <Wrapper>
      <ProfileImageWrapper>
        <Img
          src={'https://d2ffbnf2hpheay.cloudfront.net/' + commenterPhotoUrl}
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
  width: 45px;
  height: 45px;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(132, 131, 141, 0.25);
  border-radius: 50px;
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
