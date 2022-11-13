import React from 'react';
import styled from '@emotion/styled';
import { Img } from '../../../../../../components';

interface RankingProps {
  ranking: number;
}

function Tropy({ ranking }: RankingProps) {
  const imgBasket: { [numberKey: number]: string } = {
    1: '/img/1st-trophy.png',
    2: '/img/2nd-trophy.png',
    3: '/img/3rd-trophy.png',
  };

  return (
    <Container>
      <ImgContainer ranking={ranking}>
        <Img src={imgBasket[ranking]} alt={`tropy-${ranking}`} />
      </ImgContainer>
    </Container>
  );
}

export default Tropy;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 182px;
  height: fit-content;
  position: relative;
  & > :not(:last-child) {
    margin: 0 8px 0 0;
  }
  .star {
    position: absolute;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
    width: 35px;
    height: 35px;
  }
  .trophy {
    width: 51px;
    height: 58px;
  }
  .top {
    width: 70px;
    height: 70px;
  }
`;

const ImgContainer = styled.div<{ ranking: number }>`
  width: ${props => (props.ranking === 1 ? '70px' : '51px')};
  height: ${props => (props.ranking === 1 ? '70px' : '58px')};
`;
