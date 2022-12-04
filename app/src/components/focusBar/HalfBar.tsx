import { useState } from 'react';
import { css, cx } from '@emotion/css';
import { color, font } from '../../styles';

interface Props {
  [key: string]: any;
}

function HalfBar({ alarm, focus }: Props) {
  const [focusMenu, setFocusMenu] = useState(focus);

  const [firstIsHover, setFirstIsHover] = useState(false);
  const firstToggleHover = () => setFirstIsHover(!firstIsHover);

  const [secondIsHover, setSecondIsHover] = useState(false);
  const secondToggleHover = () => setSecondIsHover(!secondIsHover);

  const halfWrapper = css`
    width: ${alarm ? 264 : 480}px;
    display: flex;
    flex-direction: column;
  `;

  const menuWrapper = css`
    width: 100%;
    display: flex;
    justify-content: space-around;
    span {
      font-size: ${alarm ? 18 : 24}px;
      line-height: ${alarm ? 30.6 : 31.2}px;
      ${font.weight[400]};
      padding-bottom: ${alarm ? 8 : 16}px;
      padding-left: 30px;
      padding-right: 30px;
      cursor: pointer;
    }

    & > :first-of-type {
      color: ${focusMenu ? color.main : color.dark1};
    }

    & > :last-of-type {
      color: ${focusMenu ? color.dark1 : color.main};
    }

    & > :hover {
      color: ${color.main};
    }
  `;

  const hoverColor = css`
    color: ${color.main} !important;
  `;

  const barWrapper = css`
    display: flex;
    height: ${alarm ? 2 : 6}px;
    width: 100%;
    div {
      cursor: pointer;
      width: 50%;
    }
  `;

  const barTransition = css`
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s;
  `;

  const firstBar = css`
    background-color: ${focusMenu ? color.main : color.light4};
    ${barTransition}
  `;
  const secondBar = css`
    background-color: ${focusMenu ? color.light4 : color.main};
    ${barTransition}
  `;

  const clickedFirst = () => {
    setFocusMenu(true);
    focus(true);
  };

  const clickedSecond = () => {
    setFocusMenu(false);
    focus(false);
  };

  return (
    <div className={cx(halfWrapper)}>
      <div className={cx(menuWrapper)}>
        <span onClick={clickedFirst} className={cx(firstIsHover && hoverColor)}>
          {alarm ? '쪽지' : '로그인'}
        </span>
        <span
          onClick={clickedSecond}
          className={cx(secondIsHover && hoverColor)}
        >
          {alarm ? '찜하기' : '회원가입'}
        </span>
      </div>
      <div className={cx(barWrapper)}>
        <div
          onMouseEnter={firstToggleHover}
          onMouseLeave={firstToggleHover}
          onClick={clickedFirst}
          className={cx(firstBar)}
        ></div>
        <div
          onMouseEnter={secondToggleHover}
          onMouseLeave={secondToggleHover}
          onClick={clickedSecond}
          className={cx(secondBar)}
        ></div>
      </div>
    </div>
  );
}

export default HalfBar;
