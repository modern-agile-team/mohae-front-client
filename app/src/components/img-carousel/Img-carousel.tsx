import { cx, css } from '@emotion/css';
import { useState } from 'react';
import { color, radius, font, shadow } from '../../styles';

interface Props {
  [key: string]: any;
}

export default function Carousel(props: Props) {
  const IMAGES = [
    'img/camera.png',
    'img/edit.png',
    'img/filter.png',
    'img/heart-main.png',
    'img/study.png',
    'img/send.png',
    'img/star-unfilled.png',
  ];

  const size = Number(props.size) || 552;
  // 보여지는 한개의 사이즈 >> 리사이즈 할 시 size 수정

  const [sector, setSector] = useState(0);

  const wrapper = css`
    width: 100%;
    height: 100%;
    background-color: white;
    position: relative;
    border-radius: inherit;
  `;

  const box = css`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 6px;
  `;

  const container = () => {
    const col = `calc(100% * ${IMAGES.length})`;
    const translate = `translateX(${
      ((-1 * ((sector % IMAGES.length) + IMAGES.length)) % IMAGES.length) * size
    }px)`;
    return css`
      width: ${col};
      transition: 0.3s;
      transform: ${translate};
      height: 100%;
      display: flex;
      align-items: center;
    `;
  };

  const item = (img: string) => {
    return css`
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 400px;
      background: url(${img}) no-repeat center/contain;
      color: white;
    `;
  };

  const next = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.name === '+') {
      setSector(sector + 1);
    } else {
      setSector(sector - 1);
    }
  };

  const show = IMAGES.map((img, index) => <div className={cx(item(img))} />);

  const circleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSector(Number(e.currentTarget.id));
  };

  const btn = css`
    width: 48px;
    height: 48px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  `;

  const prevBtn = css`
    ${btn}
    left:0;
    background: url('/img/arrow-left-light1.png') no-repeat center/contain;
  `;
  const nextBtn = css`
    ${btn}
    right: 0;
    background: url('/img/arrow-right-light1.png') no-repeat center/contain;
  `;

  const pagenation = css`
    width: ${`${IMAGES.length * 24 - 16}px`};
    height: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
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
      transform: ${`scale(${currentSize})`};
      :hover {
        background-color: ${color.main};
      }
    `;
  };

  return (
    <div className={cx(wrapper)}>
      <div className={cx(box)}>
        <div className={cx(container())}>{show}</div>
      </div>
      <button className={cx(prevBtn)} onClick={next} name="-" />
      <button className={cx(nextBtn)} onClick={next} name="+" />
      <div className={cx(pagenation)}>
        {IMAGES.map((img, index) => (
          <button
            key={index}
            id={`${index}`}
            onClick={circleClick}
            className={cx(circle(index))}
          />
        ))}
      </div>
    </div>
  );
}
