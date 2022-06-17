/** @format */

import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../style/palette';
import { ReactElement } from 'react';
import { Img } from '../../../components';

const wrapper = css`
  * {
    background-color: inherit;
  }
  background-color: ${color.light1};
  position: sticky;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  ${shadow.normal}
  @media (max-width: 1200px) {
    padding: 0 calc(calc(1200px - 1128px) / 2);
  }
  @media (min-width: 1200px) {
    padding: 0 calc((100vw - 1128px) / 2);
  }
  display: flex;

  justify-content: space-between;
  height: 59px;
  overflow: hidden;

  .logo {
    width: 57px;
    height: 100%;
  }

  .button-wrapper {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > :not(:last-child) {
      margin-right: 40px;
    }
  }

  .button {
    height: 100%;
    font-size: 14px;
  }

  .square-buttons {
    display: flex;
    & > :not(:last-child) {
      margin-right: 8px;
    }
  }
`;

type Props = {
  [key: string]: any;
};

export default function Header(props: Props): ReactElement {
  const text = {
    boards: '게시판',
    notice: '공지사항',
    inquire: '문의하기',
    regist: '회원가입',
    login: '로그인',
  };

  return (
    <div className={cx(wrapper)}>
      <div className={'logo'}>
        <Img src={'/img/logo.png'} />
      </div>
      <div className={'button-wrapper'}>
        <button className={'button'}>{text.boards}</button>
        <button className={'button'}>{text.notice}</button>
        <button className={'button'}>{text.inquire}</button>
        <div className={'square-buttons'}>
          {/* <Btn6>{text.regist}</Btn6>
          <Btn6 main>{text.login}</Btn6> */}
        </div>
      </div>
    </div>
  );
}
