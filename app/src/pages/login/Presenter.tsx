/** @format */

import { Img, FocusBar, BasicModal } from '../../components';
import { radius, font, color, shadow } from '../../styles';
import { css, cx } from '@emotion/css';
import { ReactElement } from 'react';
import Login from './login/Login';
import Agreement from './register/Agreement';
import Main from './register/Main';
import PersonalInfo from './register/PersonalInfo';
import SelectInfo from './register/SelectInfo';

interface Props {
  [key: string]: any;
}

export default function Presenter({
  text,
  isOpenModal,
  children,
  part,
  onClick,
}: Props): ReactElement {
  // const move = `transform: translateX(calc((480px * 3) / 2 - ${part} * 480px));`;
  const move = `translateX(calc((480px * 3) / 2 - ${part} * 480px));`;

  const mainContents = [
    <Login text={text} />,
    <Main text={text} next={onClick.enterRegister} />,
    <Agreement text={text} next={onClick.agreement} />,
    <PersonalInfo text={text} part={part} next={onClick.finishedInputInfo} />,
    // <SelectInfo next={onClick.finishedAll} />,
  ];
  const style = css`
    width: 100%;
    height: 100%;
    overflow: hidden;
    ${radius[24]}
    padding: ${`${part < 2 ? '45px 228px 0' : '37px 228px 0'}`};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    > .logo {
      width: 66px;
      height: ${`${part < 2 ? '50px' : '0'}`};
      transition: 0.3s all ease-in-out;
      overflow: hidden;
      /* margin-bottom: ${`${part < 2 ? '50px' : '0'}`}; */
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
    > .main {
      display: flex;
      width: ${`calc(480px * ${mainContents.length})`};
      transition: 0.3s all ease-in-out;
      transform: ${move};

      > * :not(:last-child) {
        /* margin */
      }
    }
  `;
  return (
    <BasicModal small visible={isOpenModal}>
      {/* edit visible={isOpenModal} after test */}
      <div className={cx(style)}>
        <div className={'logo'}>
          <Img src={'/img/logo.png'} />
        </div>
        <ul className={'menu'}>
          <button onClick={onClick.login}>{text.login}</button>
          <button onClick={onClick.register}>{text.register}</button>
        </ul>
        <FocusBar thin />
        <div className={'main'}>{mainContents}</div>
      </div>
    </BasicModal>
  );
}
