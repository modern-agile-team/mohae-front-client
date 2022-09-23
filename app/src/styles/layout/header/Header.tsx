/** @format */

import { css, cx } from '@emotion/css';
import { color, shadow } from '../../style/palette';
import { ReactElement } from 'react';
import { Img, Btn } from '../../../components';
import { open_login, open_register_modal } from '../../../redux/modal/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/root';
import { Link } from 'react-router-dom';
import getToken from '../../../utils/getToken';
import { decodeToken } from 'react-jwt';

type Props = {
  [key: string]: any;
};

export default function Header(props: Props): ReactElement {
  const text = {
    boards: '게시판',
    service: '고객지원',
    notice: '공지사항',
    FAQ: 'FAQ',
    inquire: '문의하기',
    regist: '회원가입',
    login: '로그인',
    sir: '님',
  };
  const TOKEN = getToken();
  const tokenInfo: Props = decodeToken<any>(TOKEN);
  const userInfo: { [key: string]: any } = {
    nickname: TOKEN !== '' && tokenInfo.nickname,
    userNo: TOKEN !== '' && tokenInfo.userNo,
  };
  const user: any = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch<AppDispatch>();

  const toggleLoginModal = (e: React.MouseEvent) => {
    dispatch(open_login(true));
  };

  const toggleRegisterModal = () => {
    dispatch(open_register_modal(true));
  };

  const loginButtons = (
    <div className={'square-buttons'}>
      <Btn white onClick={toggleRegisterModal}>
        {text.regist}
      </Btn>
      <Btn main onClick={toggleLoginModal}>
        {text.login}
      </Btn>
    </div>
  );

  const userInfoBtn = (
    <Link to={`/mypage/${userInfo.userNo}`}>
      <div className={'user-info'}>
        <span>{user.nickname}</span>
        <span>{text.sir}</span>
        <div className={'photo'}>
          <Img
            src={
              (user.photo_url !== null &&
                'https://d2ffbnf2hpheay.cloudfront.net/' + user.photo_url) ||
              '/img/profile.png'
            }
          />
        </div>
      </div>
    </Link>
  );

  return (
    <div className={cx(wrapper)}>
      <Link className={'logo'} to={'/'}>
        <Img src={'/img/logo.png'} />
      </Link>
      <div className={'button-wrapper'}>
        <button className={'menu'}>
          <Link to={'/boards/categories/1'}>{text.boards}</Link>
        </button>
        <button className={'menu FAQ'}>
          {text.service}
          <div className={'dropbox'}>
            <Link to={'/support/notices'}>{text.notice}</Link>
            <Link to={'/support/faqs'}>{text.FAQ}</Link>
          </div>
        </button>
        <button className={'menu'}>
          <Link to={'/inquire'}>{text.inquire}</Link>
        </button>

        {getToken() !== '' ? userInfoBtn : loginButtons}
      </div>
    </div>
  );
}

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
  ${shadow.normal};
  @media (max-width: 1200px) {
    padding: 0 calc(calc(1200px - 1128px) / 2);
  }
  @media (min-width: 1200px) {
    padding: 0 calc((100vw - 1128px) / 2);
  }
  display: flex;
  justify-content: space-between;
  height: 59px;
  /* overflow: hidden; */
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
    .FAQ {
      height: 23px;
      display: flex;
      flex-direction: column;
      position: relative;
      /* overflow: hidden; */
      > .dropbox {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 84px;
        height: fit-content;
        top: calc(100% + 8px);
        left: -16px;
        border-radius: 6px;
        ${shadow.normal};
        bottom: -100%;
        display: flex;
        flex-direction: column;
        visibility: hidden;
      }
      :focus,
      :focus-within {
        > .dropbox {
          visibility: visible;
          overflow: hidden;
          > * {
            width: 100%;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            :hover {
              background-color: ${color.subtle};
            }
            :active {
              background-color: ${color.lighter};
            }
          }
        }
      }
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
    > a > .user-info {
      width: fit-content;
      /* background-color: lightblue; */
      display: flex;
      justify-content: space-between;
      align-items: center;
      > :first-child {
        margin-right: 4px;
      }
      .photo {
        margin-left: 8px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
        width: 43px;
        height: 43px;
      }
    }
  }
`;
