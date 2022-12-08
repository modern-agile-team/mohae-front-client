import React from 'react';
import PostWriter from '../writer/PostWriter';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/root';
import styled from '@emotion/styled';
import DecimalDay from '../DDAY/DecimalDay';
import useScroll from '../../../../customhook/useScroll';

function QuickMenu() {
  const { price, title, authorization } = useSelector((state: RootState) => ({
    authorization: state.post.data.response.authorization,
    title: state.post.data.response.board.title,
    price: state.post.data.response.board.price,
  }));
  const scrollY = useScroll().scrollY;

  if (!authorization && scrollY < 490) return null;

  return (
    <>
      {scrollY > 490 && (
        <Container>
          <div>
            <FlexWrapper>
              <Title>{title}</Title>
              <DecimalDay />
            </FlexWrapper>
            <Price price={price}>
              {price ? price.toLocaleString() : '무료'}
            </Price>
          </div>
          <PostWriter />
        </Container>
      )}
    </>
  );
}

export default QuickMenu;

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  width: 1128px;
  background-color: white;
  border-radius: 0px 0px 6px 6px;
  box-shadow: 0px 4px 4px 0px #0000001a;
  padding: 0px 24px 20px 24px;
  color: #4f4e5c;

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translate3d(0, -8px, 0);
    }
    100% {
      opacity: 1;
      transform: translateZ(0);
    }
  }
  position: fixed;
  top: 59px;
  animation: fadeInDown 1s;
  .user-data {
    margin-right: 16px;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  & > section {
    margin-top: 20px;
  }
`;

const Title = styled.p`
  margin-top: 20px;
  display: flex;
  align-items: center;
  height: 21px;
  font-size: 16px;
  font-family: 'Bold';
`;

const Price = styled.p<{ price: number }>`
  font-size: 14px;
  font-family: 'Regular';
  height: 24px;
  :after {
    content: '${props => (props.price ? '원' : '')}';
    margin: 0px 0px 0px 4px;
  }
`;
