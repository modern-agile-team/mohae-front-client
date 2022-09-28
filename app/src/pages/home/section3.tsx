/** @format */

import React, { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';
import { Img } from '../../components';
import { setMaxListeners } from 'process';
import styled from '@emotion/styled';
import { url } from 'inspector';

interface Props {
  [key: string]: any;
}

export default function Part3(props: Props) {
  const [imgs, setImgs] = useState([
    '/img/guide-01.jpg',
    '/img/guide-02.jpg',
    '/img/guide-03.jpg',
    '/img/guide-04.jpg',
    '/img/guide-05.jpg',
    '/img/guide-06.jpg',
    '/img/guide-07.jpg',
    '/img/guide-08.jpg',
    '/img/guide-09.jpg',
    '/img/guide-10.jpg',
  ]);
  const [carouselContentsViewBig, setCarouselContentsViewBig] = useState(false);
  const [target, setTarget] = useState(1);
  const move = `translateX(${-(target - 1) * 456}px)`;

  const style = css`
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: calc((100vh - 59px - 424px) / 2) calc((100% - 1128px) / 2);

    .title {
      font-weight: 700;
      font-size: 28px;
      line-height: 130%;
      color: ${color.dark1};
      margin: 0 0 56px;
    }

    .wrapper {
      width: 100%;
      height: 336px;
      position: relative;
    }

    .container {
      width: 100%;
      height: 360px;
      overflow-x: hidden;
      /* padding: 0px 2px; */
    }

    .box {
      width: fit-content;
      height: 100%;
      display: flex;
      align-items: center;
      transition: 0.5s all ease-in-out;
      transform: ${move};
      & > * {
        transition: 0.5s all ease-in-out;
        transform: scale(1);
      }
      & > :nth-of-type(${target + 1}) {
        transition: 0.5s all ease-in-out;
        transform: scale(1.21052);
        z-index: 5;
        margin: 0 calc(-1 * (456px - 336px));
      }
    }

    .imgContainer {
      width: 456px;
      height: 274px;
      box-shadow: 0px 0px 4px rgba(132, 131, 141, 0.25);
      &,
      div {
        ${radius[6]}
      }
    }

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

  const carouselContents = (src: string) => css`
    width: 100%;
    height: 100%;
    background: no-repeat center/90% url(${String(src)}) white;
  `;

  const handleContentsClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (index !== target) {
      setTarget(index);
    } else setCarouselContentsViewBig(prev => !prev);
  };

  const handleCircleBtnClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (index !== target) {
      setTarget(index);
    }
  };

  const imgCarousel = imgs.map((url: string, index: number) => (
    <div
      key={index}
      className={'imgContainer'}
      onClick={e => handleContentsClick(e, index)}
    >
      <div className={cx(carouselContents(url))} />
    </div>
  ));

  const clickMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const item = e.currentTarget;
    item.disabled = true;
    setTimeout(() => {
      item.disabled = false;
    }, 500);
    if (item.id === '+') {
      if (target === imgs.length - 1) {
        setTarget(0);
      } else {
        setTarget(target + 1);
      }
    } else if (item.id === '-') {
      if (!target) {
        setTarget(imgs.length - 1);
      } else {
        setTarget(target - 1);
      }
    }
  };

  const createCircleBtn = imgs.map((_, index) => {
    if (target === index) {
      return (
        <CircleBtn
          targeting={true}
          key={index}
          onClick={e => handleCircleBtnClick(e, index)}
        />
      );
    } else
      return (
        <CircleBtn
          targeting={false}
          key={index}
          onClick={e => handleCircleBtnClick(e, index)}
        />
      );
  });

  return (
    <div className={cx(style)}>
      <span className={'title'}>{'사용법이 궁금하다면?'}</span>
      <div className={'wrapper'}>
        <div className={'container'}>
          <button onClick={clickMove} id={'-'} className={'arrow prev'}>
            <Img src={'/img/arrow-left-main.png'} />
          </button>
          <button onClick={clickMove} id={'+'} className={'arrow next'}>
            <Img src={'/img/arrow-right-main.png'} />
          </button>
          <div className={'box'}>{imgCarousel}</div>
        </div>
      </div>
      {carouselContentsViewBig && (
        <>
          <Overlay onClick={() => setCarouselContentsViewBig(false)}>
            <ModalImg
              onClick={e => e.stopPropagation()}
              onWheel={e => e.stopPropagation()}
            >
              <button onClick={clickMove} id={'-'} className={'arrow prev'}>
                <Img src={'/img/arrow-left-main.png'} />
              </button>
              <button onClick={clickMove} id={'+'} className={'arrow next'}>
                <Img src={'/img/arrow-right-main.png'} />
              </button>
              <div className="contents-wrapper">
                <Contents src={imgs[target]}></Contents>
              </div>
              <div className="btn-wrap">{createCircleBtn}</div>
            </ModalImg>
          </Overlay>
        </>
      )}
    </div>
  );
}

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

const CircleBtn = styled.button<{ targeting: boolean }>`
  width: ${props => (props.targeting ? '14px' : '6px')};
  height: ${props => (props.targeting ? '14px' : '6px')};
  background-color: ${props => (props.targeting ? '#FF445E' : '#E7E7E8')};
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
