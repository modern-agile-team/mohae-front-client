import React from 'react';
import styled from '@emotion/styled';
import { ImgCarousel, ImgModal } from './components';
import { PresenterProps } from '../../../../types/main/thirdPage/type';

function Presenter(props: PresenterProps) {
  const {
    imgs,
    target,
    carouselContentsViewBig,
    clickMove,
    setTarget,
    setCarouselContentsViewBig,
  } = props;

  return (
    <Container>
      <span className="title">사용법이 궁금하다면?</span>
      <div className="wrapper">
        <ImgCarousel
          imgs={imgs}
          target={target}
          setTarget={setTarget}
          clickMove={clickMove}
          setCarouselContentsViewBig={setCarouselContentsViewBig}
        />
      </div>
      {carouselContentsViewBig && (
        <ImgModal
          imgs={imgs}
          target={target}
          clickMove={clickMove}
          setTarget={setTarget}
          setCarouselContentsViewBig={setCarouselContentsViewBig}
        />
      )}
    </Container>
  );
}

export default Presenter;

const Container = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: calc((100vh - 59px - 424px) / 2) calc((100% - 1128px) / 2);

  .title {
    font-weight: 700;
    font-size: 28px;
    line-height: 130%;
    color: #4f4e5c;
    margin: 0 0 56px;
  }

  .wrapper {
    width: 100%;
    height: 336px;
    position: relative;
  }
`;
