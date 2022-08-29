/** @format */

import { css, cx } from '@emotion/css';
import { font, color, radius, shadow } from '../../styles';

interface Props {
  [key: string]: any;
}

export default function Wrapper({ children }: Props) {
  const style = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${radius[24]}
    .logo {
      width: 66.4px;
      height: 50px;
      margin-bottom: 24px;
    }
    .main {
      color: ${color.main};
    }
    .bold {
      ${font.weight[700]};
      font-size: 24px;
    }
    .description {
      font-size: 24px;
      color: ${color.dark1};
      margin-bottom: 16px;
    }
    .lightgray {
      color: ${color.dark3};
    }
    .row {
      display: flex;
      justify-content: center;
    }
    .sub {
      margin-bottom: 40px;
    }
    .write {
      display: flex;
      align-items: center;
      margin-bottom: 40px;
      label {
        color: ${color.dark1};
        width: 97px;
        text-align: center;
      }
      input {
        width: 350px;
        color: ${color.dark2};
        padding: 16px;
        font-size: 14px;
        ${radius[6]};
        ${shadow.inputGray};
      }
    }
    .btns {
      display: flex;
      > div {
        width: 74px;
        height: 43px;
      }
      > :not(:last-child) {
        margin-right: 8px;
      }
      align-items: center;
    }
    .img {
      width: 50px;
      height: 50px;
      margin: 16px 0;
    }
    .desc-completion {
      font-size: 18px;
      text-align: center;
      margin-bottom: 24px;
      color: ${color.dark1};
    }
    .btn-main > button {
      padding: 12px 31px;
      .move {
        width: 20px;
        height: 20px;
      }
    }
  `;
  return <div className={cx(style)}>{children}</div>;
}
