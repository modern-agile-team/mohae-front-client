import React from 'react';
import styled from '@emotion/styled';
import { Img } from '../../../../../../components';
import { ArrowButtonsProps } from '../../../../../../types/main/thirdPage/type';

function ArrowButtons({ clickMove, usedIn }: ArrowButtonsProps) {
  return (
    <>
      <PrevArrowButton usedIn={usedIn} onClick={clickMove} id="-">
        <Img src="/img/arrow-left-main.png" />
      </PrevArrowButton>
      <NextArrowButton usedIn={usedIn} onClick={clickMove} id="+">
        <Img src="/img/arrow-right-main.png" />
      </NextArrowButton>
    </>
  );
}

export default ArrowButtons;

const RootStyle = styled.button`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const PrevArrowButton = styled(RootStyle)<{ usedIn: string }>`
  left: ${props => (props.usedIn === 'modal' ? '0px' : '-48px')};
`;

const NextArrowButton = styled(RootStyle)<{ usedIn: string }>`
  right: ${props => (props.usedIn === 'modal' ? '0px' : '-48px')};
`;
