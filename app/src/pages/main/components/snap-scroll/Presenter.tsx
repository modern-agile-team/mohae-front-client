/** @format */

import React, { Fragment, Dispatch } from 'react';
import styled from '@emotion/styled';
import { css, cx } from '@emotion/css';
import { color } from '../../../../styles';

interface PresenterProps {
  contents: React.ReactNode[];
  snapPageNumber: number;
  setSnapPageNumber: Dispatch<React.SetStateAction<number>>;
  wheelHandler: (e: React.WheelEvent<HTMLDivElement>) => void;
}

function Presenter({
  contents,
  wheelHandler,
  snapPageNumber,
  setSnapPageNumber,
}: PresenterProps) {
  const colors = ['#F9F9F9', '#EDEDEF'];
  // 반복할 배경 색상

  const container = css`
    overflow: auto;
    height: fit-content;
    &::-webkit-scrollbar {
      display: none;
    }
    position: relative;

    .snap-container {
      overflow: hidden;
      height: calc(100vh - 59px);
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

  const clickCircle = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSnapPageNumber(Number(e.currentTarget.name));
  };

  const pageCircles = contents.map((i, index) => {
    const circle = css`
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #e7e7e8;
      transition: all 0.5s;
    `;
    const target =
      snapPageNumber === index
        ? css`
            background-color: #ff445e;
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

  const showSnap = contents.map((i, index) => {
    const pageStyle = css`
      height: calc(100vh - 59px);
      text-align: center;
      background-color: ${colors[index % colors.length]};
    `;
    return (
      <div key={`${index}`} className={cx(pageStyle)}>
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
        <ContentsBox contents={contents} snapPageNumber={snapPageNumber}>
          {showSnap}
        </ContentsBox>
      </div>
    </div>
  );
}

export default Presenter;

const ContentsBox = styled.div<{
  contents: React.ReactNode[];
  snapPageNumber: number;
}>`
  height: calc(calc(100vh - 59px) * ${props => props.contents.length});
  transition: all 0.8s cubic-bezier(0.61, 0.31, 0.36, 0.69);
  transform: translateY(
    calc(calc(100vh - 59px) * ${props => -props.snapPageNumber})
  );
`;
