import { cx, css } from '@emotion/css';
import { useState } from 'react';
import Img from '../img/Img';
import { color, radius, font, shadow } from '../../styles';

interface Props {
  [key: string]: any;
}

export default function Carousel({ onClick, images }: Props) {
  const IMAGES =
    [
      'img/camera.png',
      'img/edit.png',
      'img/filter.png',
      'img/heart-main.png',
      'img/study.png',
      'img/send.png',
      'img/star-unfilled.png',
    ] || images;

  const [sector, setSector] = useState(0);

  const container = () => {
    const col = `calc(100% * ${IMAGES.length})`;
    const translate = `translateX(calc(${100 / IMAGES.length}% * ${
      (-1 * ((sector % IMAGES.length) + IMAGES.length)) % IMAGES.length
    }))`;
    return css`
      width: ${col};
      transition: 0.3s;
      transform: ${translate};
      height: 100%;
      display: flex;
      align-items: center;
    `;
  };

  const style = css`
    width: 100%;
    height: 100%;
    background-color: white;
    position: relative;
    border-radius: inherit;

    .box {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 6px;
    }

    .container {
      ${container()}
    }

    .btn {
      width: 48px;
      height: 48px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    .prev {
      left: 0;
      background: url('/img/arrow-left-light1.png') no-repeat center/contain;
    }
    .next {
      right: 0;
      background: url('/img/arrow-right-light1.png') no-repeat center/contain;
    }

    .circles-container {
      width: ${`${IMAGES.length * 24 - 16}px`};
      height: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
    }

    .img {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 400px;
      /* color: white; */
    }
  `;

  const circle = (index: number) => {
    const currentSize =
      ((sector % IMAGES.length) + IMAGES.length) % IMAGES.length === index
        ? 1.75
        : 1;
    const currentColor =
      ((sector % IMAGES.length) + IMAGES.length) % IMAGES.length === index
        ? `${color.main}`
        : `${color.light1}`;
    return css`
      background-color: ${currentColor};
      width: 8px;
      height: 8px;
      border-radius: 50%;
      transition: 0.2s;
      transform: ${`scale(${currentSize})`};
      :hover {
        transition: 0s;
        background-color: ${color.main};
      }
    `;
  };

  const clickArrowBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.name === '+') {
      setSector(sector + 1);
    } else {
      setSector(sector - 1);
    }
  };

  const iamges = IMAGES.map((img, index) => (
    <div className={'img'} key={index}>
      <Img src={img} />
    </div>
  ));

  const circleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSector(Number(e.currentTarget.id));
  };

  const circles = IMAGES.map((img, index) => (
    <button
      key={index}
      id={`${index}`}
      onClick={circleClick}
      className={cx(circle(index))}
    />
  ));

  return (
    <div className={cx(style)}>
      <div className={'box'}>
        <div className={'container'}>{iamges}</div>
      </div>
      <button className={'btn prev'} onClick={clickArrowBtn} name="-" />
      <button className={'btn next'} onClick={clickArrowBtn} name="+" />
      <div className={'circles-container'}>{circles}</div>
    </div>
  );
}
