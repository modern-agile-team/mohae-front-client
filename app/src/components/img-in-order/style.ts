import { convertToRaw } from 'draft-js';
import { color, shadow, radius } from '../../styles';
import { css } from '@emotion/css';
import { keyframes } from '@emotion/react';

interface Props {
  [key: string]: any;
}

interface Check {
  [key: string]: any;
}

export default function Style({ inline }: Props) {
  const check: Check = {
    true: css`
      .container {
        height: fit-content;
        padding: 0 8px;
        & > * {
          margin: 0 6px;
        }
        & > :first-child {
          margin: 0 6px 0 8px;
        }
        & > :nth-child(5) {
          margin: 0 8px 0 6px;
        }
        .show {
        }
      }
    `,
    undefined: css`
      padding: 8px;
      .container {
        flex-wrap: wrap;
      }
      .item-box {
        width: 130px;
        height: 130px;
        margin: 8px 8px;
      }
      .add {
        ${shadow.normal}
        background-color: white;
      }
      .icon {
        width: 24px;
        height: 24px;
        background: url('img/add-dark3.png') no-repeat center/contain;
      }

      .delete {
        top: 8px;
        right: 8px;
      }
    `,
  };

  const style = () => {
    const diffStyle = check[inline];
    return css`
      width: 100%;
      height: 100%;
      position: relative;

      .alarm {
        @keyframes fadeout {
          0% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        position: absolute;
        z-index: 10;
        width: 250px;
        height: 50px;
        top: -30px;
        padding: 4px 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: lightblue;
        animation: fadeout 4s ease-in-out forwards;
      }

      .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        overflow: auto;
        &::-webkit-scrollbar {
          display: none;
        }
      }
      .container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-start;
        align-content: flex-start;
        .show {
          cursor: pointer;
        }
      }
      .item-box {
        width: 56px;
        height: 56px;
        position: relative;
        :hover {
          & > :nth-child(2) {
            transition: 0.2s;
            transform: scale(1.2);
          }
          & > button {
            transition: 0.2s;
            transform: scale(1.2);
          }
        }
        background-color: white;
      }

      .add {
        width: 56px;
        height: 56px;
        background: ${color.light4};
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }

      .delete {
        width: ${inline ? `15px` : `20px`};
        height: ${inline ? `15px` : `20px`};
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${color.dark4} url('/img/delete.png') no-repeat
          center/contain;
        color: ${color.main};
        border-radius: 50%;
        position: absolute;
        top: -5px;
        right: -8px;
      }

      .icon {
        width: 30px;
        height: 30px;
        background: url('img/add-white.png') no-repeat center/contain;
      }

      #input-file {
        display: none;
      }

      ${diffStyle};
    `;
  };
  if (!inline) {
    return style();
  } else {
    return style();
  }
}
