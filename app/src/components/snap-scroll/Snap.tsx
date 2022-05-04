import { useState } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';

interface Props {
  [key: string]: any;
}

export default function Snap({
  number = 4,
  // 스크롤 할 페이지 수
  size = 'calc(100vh - 59px)',
  // 높이
  children,
  colors = [color.light1, color.light3],
  // 반복할 배경 색상
  part,
  onWheel,
}: // 페이지네이션 서클 사용 시 받을 위치
Props) {
  const section = Array(number).fill(undefined);

  const container = css`
    overflow: hidden;
    height: ${size};
    /* scroll-snap-type: y mandatory; */
    &::-webkit-scrollbar {
      display: none;
    }
    position: relative;
  `;

  const box = () => {
    const row = `calc(${size} * ${section.length})`;
    const translate = `translateY(calc(${size} * ${-part}))`;
    return css`
      height: ${row};
      transition: all 0.8s cubic-bezier(0.61, 0.31, 0.36, 0.69);
      transform: ${translate};
    `;
  };

  const pageStyle = css`
    height: ${size};
    /* scroll-snap-align: start; */
    text-align: center;
  `;

  const show = section.map((i, index) => {
    const backColor = css`
      background-color: ${colors[index % colors.length]};
    `;
    return (
      <div key={`${index}`} className={cx(pageStyle, backColor)}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque facilis
      </div>
    );
  });

  const wheelHandler = (e: React.WheelEvent<HTMLDivElement>) => {
    console.log('scroll >> ', window.scrollY);
  };

  return (
    <>
      <div className={cx(container)}>
        <div
          className={cx(box())}
          onWheel={onWheel}
          // onWheel={wheelHandler}
        >
          {show}
        </div>
      </div>
    </>
  );
}
