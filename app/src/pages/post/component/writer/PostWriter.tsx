import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import Profile from '../../../../components/profile/Profile';
import Btns from '../btns/Btns';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/root';

function PostWriter() {
  const { authorization, board } = useSelector(
    (state: RootState) => state.post.data.response,
  );

  const userProfileImg = useMemo(() => {
    return board.userPhotoUrl !== null
      ? `https://d2ffbnf2hpheay.cloudfront.net/${board.userPhotoUrl}?w=60&h=60`
      : null;
  }, []);

  return (
    <>
      <Container>
        <WriterID className="user-data">
          <Profile
            img={userProfileImg}
            noneClick={!authorization}
            size={60}
            smallShadow
            userNumber={board.userNo}
          />
          <div>
            <p>{board.nickname}</p>
            <p>{board.majorName}</p>
          </div>
        </WriterID>
        <Btns />
      </Container>
    </>
  );
}

export default PostWriter;

const Container = styled.section`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  p {
    color: #4f4e5c;
    font-size: 14px;
    &:nth-of-type(1) {
      font-family: 'Bold';
      margin-bottom: 4px;
    }
    &:nth-of-type(2) {
      font-family: 'Regular';
    }
  }
`;

const WriterID = styled.article`
  display: flex;
  align-items: center;
  > :nth-of-type(2) {
    margin-left: 16px;
  }
`;
