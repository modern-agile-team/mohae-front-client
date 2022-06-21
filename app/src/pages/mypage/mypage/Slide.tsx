/** @format */

import { cx, css } from '@emotion/css';
import { useState } from 'react';
import { Img, NewPost } from '../../../components';
import { color, radius, font, shadow } from '../../../styles';

interface Props {
  [key: string]: any;
}

export default function Carousel({ onClick, imgs, outsideBtn }: Props) {
  const IMAGES = imgs || [
    '/img/camera.png',
    '/img/edit.png',
    '/img/filter.png',
    '/img/heart-main.png',
    '/img/study.png',
    '/img/send.png',
    '/img/star-unfilled.png',
    '/img/study.png',
  ];

  const [sector, setSector] = useState(0);

  const style = css`
    width: 100%;
    height: 100%;
    position: relative;
    > .whole {
      width: calc(100% + 16px);
      height: calc(100% + 16px);
      /* background-color: pink; */
      position: relative;
      overflow: hidden;
      border-radius: inherit;
      transform: translate(-8px, -8px);

      > .box {
        width: calc(100% - 16px);
        height: calc(100% - 16px);
        /* background-color: lightblue; */
        transform: translate(8px, 8px);
        border-radius: 6px;
        > .container {
          width: fit-content;
          transition: 0.7s;
          transform: ${`translateX(calc(${-sector * (228 + 32)}px))`};
          height: 100%;
          display: flex;
          align-items: center;
          > .board {
            width: 228px;
            height: 100%;
            border-radius: 6px;
            margin-right: 32px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 400px;
          }
        }
      }
    }
    > .btn {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    > .prev {
      left: 0;
      ${outsideBtn &&
      css`
        left: -24px;
      `}
      background: url('/img/arrow-left-light1.png') no-repeat center/contain;
    }
    > .next {
      right: 0;
      ${outsideBtn &&
      css`
        right: -24px;
      `}
      background: url('/img/arrow-right-light1.png') no-repeat center/contain;
    }
  `;

  const clickArrowBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.name === '+') {
      if ((sector - 1) * 3 > IMAGES.length) {
        setSector(0);
      } else {
        setSector(sector + 3);
      }
    } else {
      if (sector) {
        setSector(sector - 3);
      }
    }
  };

  const images = IMAGES.map((img: string, index: number) => (
    <>
      <div className={'board'} key={index}>
        {/* <NewPost page={'inSpec'} /> */}
      </div>
    </>
  ));

  return (
    <div className={'slide'}>
      <div className={cx(style)}>
        <div className={'whole'}>
          <div className={'box'}>
            <div className={'container'}>{images}</div>
          </div>
          {/* arrowBtn comp */}
        </div>
        <button className={'btn prev'} onClick={clickArrowBtn} name="-" />
        <button className={'btn next'} onClick={clickArrowBtn} name="+" />
      </div>
    </div>
  );
}
