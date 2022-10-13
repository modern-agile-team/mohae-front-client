import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/root';
import styled from '@emotion/styled';
import { User } from '../../../../../types/user/type';
import DecimalDay from '../../DDAY/DecimalDay';

interface PostDetailsContainerProps {
  decoded: User;
  localUser: number;
  price: number;
}

function PostDetails() {
  const decoded: User = useSelector((state: RootState) => state.user.user);
  const { target, userNo, price, categoryName, title, areaName } = useSelector(
    (state: RootState) => state.post.data.response.board,
  );

  return (
    <Container decoded={decoded} localUser={userNo} price={price}>
      <div>
        <p>
          {target ? '구할래요' : '해줄래요'} {'>'} 카테고리 {'>'} {categoryName}
        </p>
        <FlexWrapper>
          <Title>{title}</Title>
          <DecimalDay />
        </FlexWrapper>
        <p>{areaName ? areaName : '지역 선택 없음'}</p>
      </div>
      <Price price={price}>{price ? price.toLocaleString() : '무료'}</Price>
    </Container>
  );
}

export default PostDetails;

const Container = styled.section<PostDetailsContainerProps>`
  display: flex;
  flex-direction: column;
  height: 154px;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.p`
  display: flex;
  align-items: center;
  font-family: 'Bold';
  font-size: 24px;
`;

const Price = styled.p<{ price: number }>`
  margin-bottom: 16px;
  font-size: 24px;
  font-family: 'Bold';
  :after {
    font-size: 22px;
    content: '${props => (props.price ? '원' : '')}';
    margin: 0px 0px 0px 4px;
  }
`;
