/** @format */

import { css, cx } from '@emotion/css';
import { color, font, radius, shadow } from '../../styles';
export const style = css`
  padding: 16px 24px;
  border-radius: 6px;
  ${shadow.normal};
  background-color: white;
  width: 100%;
  height: 63px;
  position: absolute;
  overflow: hidden;
  transition: 0.3s all ease-in-out;
  :focus-within {
    height: 302px;
    :after {
      content: '검색어는 최대 10개만 기록됩니다.';
      position: absolute;
      top: 50px;
      left: -225px;
      color: ${color.main};
      border-radius: 6px;
      @keyframes fadeout {
        20% {
          left: 24px;
        }
        80% {
          left: 24px;
        }
        100% {
          left: -225px;
        }
      }
      animation: fadeout 3.5s cubic-bezier(0.26, -0.02, 0.4, 1) 0.2s;
    }
  }

  > input {
    width: 545px;
    height: 31px;
    color: ${color.dark2};
    font-size: 24px;
    line-height: 31px;
    margin-bottom: 32px;
  }

  > button {
    position: absolute;
    z-index: 10;
    top: 16px;

    right: 24px;
    width: 31px;
    height: 31px;
    :hover {
      cursor: pointer;
    }
    background: url('/img/search.png') no-repeat center/contain;
  }

  > div {
    display: flex;
    justify-content: space-between;
    > .part {
      width: 100%;

      height: fit-content;
      div {
        margin-bottom: 8px;
        > .title {
          display: inline-block;
          width: 117px;
          font-size: 18px;
        }
        > button {
          font-size: 12px;
          margin-left: 112px;
          color: ${color.dark2};
        }
      }

      ul {
        li {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: ${color.dark2};
        }
        > :not(:last-child) {
          margin-bottom: 8px;
        }
      }
    }
    > .words {
      padding-right: 23px;

      li {
        justify-content: space-between;
        button {
          width: 16px;
          height: 16px;
          background: url('/img/close-dark2.png') no-repeat center/contain;
        }
      }
    }
    > .popular {
      padding-left: 24px;
      border-left: solid ${color.light4} 1px;
      span {
        ${font.weight[700]};
        color: ${color.main};
      }
      a {
        margin-left: 12px;
      }
    }
  }
`;
