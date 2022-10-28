import React, { Dispatch } from 'react';
import styled from '@emotion/styled';
import ArrowButtons from '../arrowButtons/ArrowButtons';
import { ImgComponentsProps as ImgModalProps } from '../../../../../../types/main/thirdPage/type';

function ImgModal(props: ImgModalProps) {
  const { imgs, target, setTarget, setCarouselContentsViewBig, clickMove } =
    props;

  const handleCircleBtnClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (index !== target) {
      setTarget(index);
    }
  };

  const createCircleBtn = imgs.map((_, index) => {
    return (
      <CircleBtn
        targeted={target === index}
        key={index}
        onClick={e => handleCircleBtnClick(e, index)}
      />
    );
  });

  return (
    <>
      <Overlay onClick={() => setCarouselContentsViewBig(false)}>
        <ModalImg
          onClick={e => e.stopPropagation()}
          onWheel={e => e.stopPropagation()}
        >
          <ArrowButtons usedIn={'modal'} clickMove={clickMove} />
          <div className="contents-wrapper">
            <Contents src={imgs[target]}></Contents>
          </div>
          <div className="btn-wrap">{createCircleBtn}</div>
        </ModalImg>
      </Overlay>
    </>
  );
}

export default ImgModal;

const Overlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalImg = styled.div`
  width: 936px;
  height: calc(70% + 1px);
  padding: 16px 0px;
  position: absolute;
  background-color: #f9f9f9;
  margin-top: 128px;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  .arrow {
    width: 48px;
    height: 48px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .prev {
    left: 0px;
  }
  .next {
    right: 0px;
  }
  .btn-wrap {
    width: fit-content;
    height: 10px;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 16px;
    left: auto;
  }
  .contents-wrapper {
    width: 89%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
  }
`;

const CircleBtn = styled.button<{ targeted: boolean }>`
  width: ${props => (props.targeted ? '14px' : '6px')};
  height: ${props => (props.targeted ? '14px' : '6px')};
  background-color: ${props => (props.targeted ? '#FF445E' : '#E7E7E8')};
  margin-right: 16px;
  border-radius: 50%;
`;

const Contents = styled.div<{ src: string }>`
  @media (max-height: 640px) {
    height: 400px;
    background: ${props => `no-repeat center/80% url(${String(props.src)})`};
  }
  width: 840px;
  height: 508px;
  background: ${props => `no-repeat center/100% url(${String(props.src)})`};
`;
