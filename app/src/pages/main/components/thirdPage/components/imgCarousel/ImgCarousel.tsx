import React from 'react';
import styled from '@emotion/styled';
import ArrowButtons from '../arrowButtons/ArrowButtons';
import { Img } from '../../../../../../components';
import { ImgComponentsProps as ImgCarouselProps } from '../../../../../../types/main/thirdPage/type';

function ImgCarousel(props: ImgCarouselProps) {
  const { imgs, target, setTarget, clickMove, setCarouselContentsViewBig } =
    props;

  const handleContentsClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (index !== target) {
      setTarget(index);
    } else setCarouselContentsViewBig(prev => !prev);
  };

  const imgCarousel = imgs.map((url: string, index: number) => (
    <ImgWrapper key={index} onClick={e => handleContentsClick(e, index)}>
      <Img src={url} alt={`how to use ${index}`} />
    </ImgWrapper>
  ));

  return (
    <Container className="container">
      <ArrowButtons usedIn={'carousel'} clickMove={clickMove} />
      <ContentsBox target={target}>{imgCarousel}</ContentsBox>
    </Container>
  );
}

export default ImgCarousel;

const Container = styled.section`
  width: 100%;
  height: 360px;
  overflow-x: hidden;
  .arrow {
    width: 48px;
    height: 48px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .prev {
    left: -48px;
  }

  .next {
    right: -48px;
  }
`;

const ContentsBox = styled.div<{ target: number }>`
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: center;
  transition: 0.5s all ease-in-out;
  transform: translateX(${props => -(props.target - 1) * 456}px);
  & > * {
    transition: 0.5s all ease-in-out;
    transform: scale(1);
  }
  & > :nth-of-type(${props => props.target + 1}) {
    transition: 0.5s all ease-in-out;
    transform: scale(1.21052);
    z-index: 5;
    margin: 0 calc(-1 * (456px - 336px));
  }
`;

const ImgWrapper = styled.article`
  width: 456px;
  height: 274px;
  box-shadow: 0px 0px 4px rgba(132, 131, 141, 0.25);
  padding: 12px;
  background-color: white;
  border-radius: 6px;
`;
