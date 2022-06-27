/** @format */

import {
  Img,
  Poster,
  NewPost,
  Box,
  Profile,
  FocusBar,
  Category,
  BasicModal,
  MarkBox,
  Btn,
  OrderedImg,
  Report,
} from '../../components';
import { radius, font, color, shadow } from '../../styles';
import { css, cx } from '@emotion/css';
import Login from './login/Login';
import Register from './register';

interface Props {
  [key: string]: any;
}

export default function Presenter({ isOpenModal, children }: Props) {
  const text: { [key: string]: any } = {
    login: '로그인',
    register: '회원가입',
  };
  const style = css`
    width: 100%;
    height: 100%;
    ${radius[24]};
    padding: 45px 228px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    > .logo {
      width: 66px;
      height: 50px;
      margin-bottom: 12px;
    }
    > ul {
      display: flex;
      * {
        font-size: 24px;
      }
      > :first-child {
        margin-right: 161px;
      }
      margin-bottom: 16px;
    }
    form {
      > .input {
        width: 480px;
        height: 52px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 16px;
        margin-top: 24px;
        background-color: white;
        ${radius[6]};
        ${shadow.inputGray};
        .icon {
          width: 24px;
          height: 24px;
        }
        input {
          width: 408px;
          height: 20px;
        }
      }
      > .option {
        width: 100%;
        &,
        * {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        * {
          cursor: pointer;
          color: ${color.dark1};
        }
        margin: 16px 0 24px;
        font-size: 14px;
        input {
          -moz-appearance: none;
          -webkit-appearance: none;
          -o-appearance: none;
          width: 20px;
          height: 20px;
          ${radius[6]};
          margin-right: 8px;
          background-color: white;
          box-shadow: 0px 0px 4px rgba(132, 131, 141, 0.25);
        }
      }
    }
    > .btn {
      width: 100%;
      height: 52px;
    }
    > .desc {
      * {
        width: fit-content;
        height: fit-content;
        margin: 0 auto;
      }
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      > :nth-child(1) {
        margin-top: 40px;
      }
      > :nth-child(2) {
        * {
          font-size: 24px;
        }
        > :first-child {
          ${font.weight[700]};
          margin-right: 4px;
        }
      }
      > :nth-child(3) {
        margin-top: 24px;
        text-align: center;
        font-size: 14px;
      }
    }
    > .ssary {
      margin: 16px 0;
      width: 83px;
      height: 111px;
    }
  `;
  return (
    <BasicModal small visible={isOpenModal}>
      <div className={cx(style)}>
        <div className={'logo'}>
          <Img src={'/img/logo.png'} />
        </div>
        <ul className={'menu'}>
          <button>{text.login}</button>
          <button>{text.register}</button>
        </ul>
        <FocusBar thin />
        {children}
      </div>
    </BasicModal>
  );
}
