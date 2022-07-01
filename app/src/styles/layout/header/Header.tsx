/** @format */

import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../style/palette';
import { ReactElement } from 'react';
import { Img, Btn } from '../../../components';
import { open_login } from '../../../redux/modal/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/root';
import { Link } from 'react-router-dom';

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

  const dispatch = useDispatch<AppDispatch>();
  const viewLoginModal = useSelector(
    (state: RootState) => state.modal.openLogin
  );
  // console.log(`viewLoginModal`, viewLoginModal);

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

    > .button-wrapper {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .menu {
        height: 100%;
        margin-right: 40px;
        font-size: 14px;
      }
      .square-buttons {
        display: flex;
        > * {
          width: 100px;
          height: 43px;
        }
        & > :not(:last-child) {
          margin-right: 8px;
        }
      }
    }
  `;

  const openLoginModal = (e: React.MouseEvent) => {
    dispatch(open_login(true));
  };

  return (
    <div className={cx(wrapper)}>
      <div className={'logo'}>
        <Img src={'/img/logo.png'} />
      </div>
      <div className={'button-wrapper'}>
        <Link to={`/boards/category/17?take=12&page=1`}>
          <button className={'menu'}>{text.boards}</button>
        </Link>
        <button className={'menu'}>{text.notice}</button>
        <button className={'menu'}>{text.inquire}</button>
        <div className={'square-buttons'}>
          <Btn
            white
            // onClick={openLoginModal}
          >
            {text.regist}
          </Btn>
          <Btn main onClick={openLoginModal}>
            {text.login}
          </Btn>
        </div>
      </div>
    </div>
  );
}
