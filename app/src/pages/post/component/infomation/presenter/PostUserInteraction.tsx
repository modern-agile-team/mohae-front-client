import React from 'react';
import styled from '@emotion/styled';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/root';
import { User } from '../../../../../types/user/type';
import { PostUserInteractionProps } from '../../../../../types/post/type';
import { handlePopup } from '../../../../../redux/modal/reducer';

function PostUserInteraction(props: PostUserInteractionProps) {
  const { text, children } = props.popupContents;
  const { decoded, userNo, likeCount, hit } = useSelector(
    (state: RootState) => ({
      decoded: state.user.user,
      userNo: state.post.data.response.board.userNo,
      likeCount: state.post.data.response.board.likeCount,
      hit: state.post.data.response.board.hit,
    }),
  );

  const dispatch = useDispatch();
  const { no } = useParams();

  const requestDeleteFunc = () => {
    dispatch(handlePopup({ text: text, children: children }));
  };
  return (
    <>
      <Wrap>
        <TextButtonContainer decoded={decoded} localUser={userNo}>
          <Link to={`/edit/post/${no}`}>
            <p className="edit-button">수정하기</p>
          </Link>
          <p onClick={requestDeleteFunc}>삭제하기</p>
        </TextButtonContainer>
        <ExtraInfoContainer>
          <p>좋아요 {likeCount}개</p>
          <p>조회수 {hit}회</p>
        </ExtraInfoContainer>
      </Wrap>
    </>
  );
}

export default PostUserInteraction;

const Wrap = styled.section`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  font-size: 12px;
`;

const TextButtonContainer = styled.div<{ decoded: User; localUser: number }>`
  display: flex;
  justify-content: end;
  margin-top: 4px;
  cursor: pointer;
  visibility: ${props =>
    props.decoded && props.decoded.userNo === props.localUser
      ? 'visible'
      : 'hidden'};
  .edit-button {
    margin-right: 8px;
    padding-right: 8px;
    border-right: 1px solid #e7e7e8;
  }
`;

const ExtraInfoContainer = styled.div`
  display: flex;
  p:nth-of-type(1) {
    margin-right: 16px;
  }
`;
