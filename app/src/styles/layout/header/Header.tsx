/** @format */

import { css, cx } from '@emotion/css';
import { color, shadow } from '../../style/palette';
import { Dispatch, ReactElement, SetStateAction } from 'react';
import { Img, Btn } from '../../../components';
import {
  open_login,
  open_register_modal,
} from '../../../redux/specModal/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/root';
import { Link } from 'react-router-dom';
import getToken from '../../../utils/getToken';
import { decodeToken } from 'react-jwt';
import { ACCESS_TOKEN } from '../../../consts/tokenKey';

type Props = {
  [key: string]: any;
  setSnapPageNumber?: Dispatch<SetStateAction<number>>;
};

export default function Header({ setSnapPageNumber }: Props): ReactElement {
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
  const TOKEN = getToken(ACCESS_TOKEN);
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
            alt="user-profile"
          />
        </div>
      </div>
    </Link>
  );

  return (
    <div className={cx(wrapper)}>
      <Link
        className={'logo'}
        to={'/'}
        onClick={() => setSnapPageNumber && setSnapPageNumber(0)}
      >
        <Img src={'/img/logo.png'} alt="mo-hae-logo-link-to-main" />
      </Link>
      <div className={'button-wrapper'}>
        <button className={'menu'}>
          <Link className="hover" to={'/boards/categories/1'}>
            {text.boards}
          </Link>
        </button>
        <button className={'menu FAQ'}>
          <p className="hover">{text.service}</p>
          <div className={'dropbox'}>
            <Link to={'/support/notices'}>{text.notice}</Link>
            <Link to={'/support/faqs'}>{text.FAQ}</Link>
          </div>
        </button>
        <button className={'menu'}>
          <Link className="hover" to={'/inquire'}>
            {text.inquire}
          </Link>
        </button>

        {getToken(ACCESS_TOKEN) !== '' ? userInfoBtn : loginButtons}
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
      height: 43px;
      width: 90px;
      margin-right: 10px;
      font-size: 14px;
      color: #4f4e5c;
      .hover {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
      }
      &:hover .hover {
        color: ${color.main};
      }
    }
    .FAQ {
      position: relative;
      > .dropbox {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 90px;
        height: fit-content;
        top: calc(100% + 8px);
        left: 0px;
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
      > :first-of-type {
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
