/** @format */

import { Img, FocusBar, Popup, Btn } from '../../components';
import AuthModal from '../../components/modal/AuthModal';
import { radius, font, color, shadow } from '../../styles';
import { css, cx } from '@emotion/css';
import { ReactElement, useEffect, useState } from 'react';
import Login from './login/Login';
import Agreement from './register/Agreement';
import Main from './register/Main';
import PersonalInfo from './register/PersonalInfo';
import SelectInfo from './register/SelectInfo';
import FindPassword from './findPassword/FindPassword';
import styled from '@emotion/styled';

interface Props {
  [key: string]: any;
  setPart: React.Dispatch<React.SetStateAction<number>>;
}

export default function Presenter({
  text,
  isOpenModal,
  part,
  setPart,
  onClick,
}: Props): ReactElement {
  const [popupView, setPopupView] = useState(false);
  const mainContents = [
    <Login text={text} setFindPasswordView={onClick.findPassword} />,
    <Main text={text} next={onClick.enterRegister} />,
    <Agreement next={onClick.agreement} />,
    <PersonalInfo text={text} part={part} next={onClick.finishedInputInfo} />,
    <SelectInfo next={onClick.finishedAll} setPopupView={setPopupView} />,
    <FindPassword />,
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
    }
    > ul {
      display: flex;
      * {
        font-size: 24px;
      }
      > *:not(:last-child) {
        margin-right: 161px;
      }
      > .login {
        color: ${`${part ? color.dark1 : color.main}`};
      }
      > .register {
        color: ${`${part ? color.main : color.dark1}`};
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
    > .container {
      width: calc(480px + 16px);
      padding: 0 8px;
      overflow-x: hidden;
      overflow-y: visible;
      height: fit-content;
      padding-bottom: 8px;

      display: flex;
      justify-content: flex-start;
      ::-webkit-scrollbar {
        display: none;
      }
      > .main {
        display: flex;
        justify-content: flex-start;
        width: fit-content;
        transition: 0.3s all ease-in-out;
        transform: ${`translateX(calc(${(480 + 16) * -part}px))`};
        & > * {
          width: 480px;
        }
        & > *:not(:last-child) {
          margin-right: 16px;
        }
      }
    }
    > .focusbar {
      width: 100%;
      height: 6px;
      background-color: ${color.light4};
      border-radius: 4px;
      overflow: hidden;
      > div {
        height: 100%;
        width: 50%;
        background-color: ${color.main};
        transition: 0.3s all ease-in-out;
        transform: ${`translate(${part ? '100%' : '0'})`};
      }
    }
    #find-password {
      z-index: 8;
    }
    #submit-btn {
      width: 100%;
      height: 100%;
      ${radius[6]}
      background-color: ${color.main};
      color: white;
      ${font.size[14]}
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;

  const titleTextAndFocusBarElement = () => {
    return (
      Number(part) !== 5 && (
        <>
          <ul className={'menu'}>
            <button className={'login'} onClick={onClick.login}>
              {text.login}
            </button>
            <button className={'register'} onClick={onClick.register}>
              {text.register}
            </button>
          </ul>
          <div className={'focusbar'}>
            <div />
          </div>
        </>
      )
    );
  };

  return (
    <>
      <AuthModal
        big={false}
        visible={isOpenModal}
        setPart={setPart}
        part={part}
        onClick={onClick}
      >
        <div className={cx(style)}>
          <div className={'logo'}>
            <Img src={'/img/logo.png'} />
          </div>
          {titleTextAndFocusBarElement()}
          <div className={'container'}>
            <div className={'main'}>{mainContents}</div>
          </div>
        </div>
      </AuthModal>
      {popupView && (
        <>
          <Popup
            visible={popupView}
            text1={'회원 가입이 완료 되었습니다.'}
            overlay={() => {
              setPopupView(false);
              setPart(0);
            }}
          >
            <BtnImgWrapper>
              <Btn
                main
                onClick={() => {
                  setPopupView(false);
                  setPart(0);
                }}
              >
                닫기
              </Btn>
            </BtnImgWrapper>
          </Popup>
        </>
      )}
    </>
  );
}

const BtnImgWrapper = styled.div`
  width: 74px;
  height: 43px;
`;
