/** @format */

import { useState, useEffect, useCallback, Fragment } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';

interface Props {
  [key: string]: any;
}

export default function Snap({
  contents,
  snapPageNumber,
  setSnapPageNumber,
}: Props) {
  const section = [1, 2, 3, 4],
    size = 'calc(100vh - 59px)',
    // 높이
    colors = [color.light1, color.light3];
  // 반복할 배경 색상

  const container = css`
    overflow: auto;
    height: fit-content;
    background-color: blue;
    scroll-snap-type: y;
    scroll-snap-type: y mandatory;
    &::-webkit-scrollbar {
      display: none;
    }
    position: relative;

    .snap-container {
      overflow: hidden;
      height: ${size};
      &::-webkit-scrollbar {
        display: none;
      }
      position: relative;
    }
  `;

  const circleWrapper = css`
    position: fixed;
    z-index: 3;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 27px;
    height: 74px;
  `;

  const circle = css`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${color.light4};
    transition: all 0.5s;
  `;

  const clickCircle = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSnapPageNumber(Number(e.currentTarget.name));
  };

  const wheelHandler = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      const move = e.deltaY;
      section.forEach((sector, index) => {
        if (
          move > 10 &&
          snapPageNumber === index &&
          !(index === section.length - 1)
        ) {
          setTimeout(() => {
            setSnapPageNumber(snapPageNumber + 1);
          }, 700);
        } else if (move < -10 && snapPageNumber === index && !(index === 0)) {
          setTimeout(() => {
            setSnapPageNumber(snapPageNumber - 1);
          }, 700);
        }
      });
    },
    [section],
  );

  const pageCircles = section.map((i, index) => {
    const target =
      snapPageNumber === index
        ? css`
            background-color: ${color.main};
            width: 14px;
            height: 14px;
          `
        : null;
    return index ? (
      <button
        key={`${index}`}
        className={cx(circle, target)}
        name={`${index}`}
        onClick={clickCircle}
      />
    ) : (
      <Fragment key={index}></Fragment>
    );
  });

  const box = () => {
    const row = `calc(${size} * ${section.length})`;
    const translate = `translateY(calc(${size} * ${-snapPageNumber}))`;
    return css`
      height: ${row};
      transition: all 0.8s cubic-bezier(0.61, 0.31, 0.36, 0.69);
      transform: ${translate};
    `;
  };

  const pageStyle = css`
    height: ${size};
    text-align: center;
  `;

  const showSnap = section.map((i, index) => {
    const backColor = css`
      background-color: ${colors[index % colors.length]};
    `;
    return (
      <div key={`${index}`} className={cx(pageStyle, backColor)}>
        {contents[index]}
      </div>
    );
  });

  return (
    <div className={cx(container)}>
      <div
        className={cx(
          circleWrapper,
          !snapPageNumber
            ? css`
                display: none;
              `
            : null,
        )}
      >
        {pageCircles}
      </div>
      <div className={'snap-container'} onWheel={wheelHandler}>
        <div className={cx(box())}>{showSnap}</div>
      </div>
    </div>
  );
}
