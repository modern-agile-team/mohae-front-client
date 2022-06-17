/** @format */

import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';
import { Img } from '../../components';
import { setMaxListeners } from 'process';

interface Props {
  [key: string]: any;
}

export default function Part3(props: Props) {
  const [imgs, setImgs] = useState([
      'img/notion.png',
      'img/medium.png',
      'img/notion.png',
      'img/medium.png',
      'img/notion.png',
      'img/medium.png',
    ]),
    [target, setTarget] = useState(1),
    move = `translateX(${-(target - 1) * 456}px)`;

  const style = css`
    height: 100%;
    display: flex;
    flex-direction: column;
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
      height: fit-content;
      position: relative;
    }

    .container {
      width: 100%;
      height: 332px;
      overflow: hidden;
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
      & > :nth-child(${target + 1}) {
        transition: 0.5s all ease-in-out;
        transform: scale(1.21052);
        z-index: 5;
        margin: 0 calc(-1 * (456px - 336px));
      }
    }

    .img {
      width: 456px;
      height: 274px;
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

  const imgCarousel = imgs.map((url: string, index: number) => (
    <div key={index} className={'img'}>
      <Img src={url} />
    </div>
  ));
  const clickMove = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  return (
    <div className={cx(style)}>
      <span className={'title'}>{'사용법이 궁금하다면?'}</span>
      <div className={'wrapper'}>
        <div className={'container'}>
          <button onClick={clickMove} id={'-'} className={'arrow prev'}>
            <Img src={'img/arrow-left-main.png'} />
          </button>
          <button onClick={clickMove} id={'+'} className={'arrow next'}>
            <Img src={'img/arrow-right-main.png'} />
          </button>
          <div className={'box'}>{imgCarousel}</div>
        </div>
      </div>
    </div>
  );
}
