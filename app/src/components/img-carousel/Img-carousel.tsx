/** @format */

import { cx, css } from '@emotion/css';
import { Dispatch, SetStateAction, useState } from 'react';
import Img from '../img/Img';
import { color, radius, font, shadow } from '../../styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';

interface Props {
  [key: string]: any;
  setImgIndex?: Dispatch<SetStateAction<number>>;
}

export default function Carousel({
  onClick,
  imgs,
  outsideBtn,
  imgIndex,
  setImgIndex,
}: Props) {
  const reduxImgs = useSelector(
    (state: RootState) => state.createPost.data.imgArr,
  );
  const IMAGES = imgs || [...reduxImgs];

  const [sector, setSector] = useState(0);
  const imgIndexIsDefine = (): number => {
    return String(imgIndex) ? imgIndex : sector;
  };
  const setImgIndexIsDefine = (index: number) => {
    setImgIndex ? setImgIndex(index) : setSector(index);
  };

  const container = () => {
    const col = `calc(100% * ${IMAGES.length})`;
    const translate = `translateX(calc(${100 / IMAGES.length}% * ${
      (-1 * ((imgIndexIsDefine() % IMAGES.length) + IMAGES.length)) %
      IMAGES.length
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
      left: ${outsideBtn ? `-48px` : '0'};
      background: url('/img/arrow-left-light1.png') no-repeat center/contain;
    }
    .next {
      right: ${outsideBtn ? `-48px` : '0'};
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
    }
  `;

  const circle = (index: number) => {
    const currentSize =
      ((imgIndexIsDefine() % IMAGES.length) + IMAGES.length) % IMAGES.length ===
      index
        ? 1.75
        : 1;
    const currentColor =
      ((imgIndexIsDefine() % IMAGES.length) + IMAGES.length) % IMAGES.length ===
      index
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
      setImgIndexIsDefine(imgIndexIsDefine() + 1);
    } else {
      setImgIndexIsDefine(imgIndexIsDefine() - 1);
    }
  };

  const images = IMAGES.map((img: string, index: number) => (
    <div className={'img'} key={index}>
      <Img src={img} />
    </div>
  ));
  const circleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setImgIndexIsDefine(Number(e.currentTarget.id));
  };

  const circles = IMAGES.map((img: string, index: number) => (
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
        <div className={'container'}>{images}</div>
      </div>
      <button className={'btn prev'} onClick={clickArrowBtn} name="-" />
      <button className={'btn next'} onClick={clickArrowBtn} name="+" />
      {/* arrowBtn comp */}
      <div className={'circles-container'}>{circles}</div>
    </div>
  );
}
