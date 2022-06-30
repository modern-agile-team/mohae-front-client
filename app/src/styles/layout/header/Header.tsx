/** @format */

import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../style/palette';
import { ReactElement } from 'react';
import { Img, Btn } from '../../../components';
import { open_login } from '../../../redux/modal/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/root';
import { Link, useNavigate } from 'react-router-dom';
import getToken from '../../../utils/getToken';
import { decodeToken } from 'react-jwt';

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
    sir: '님',
  };
  const TOKEN = getToken();
  const tokenInfo: Props = decodeToken<any>(TOKEN);
  const userInfo: { [key: string]: any } = {
    nickname: TOKEN !== '' && tokenInfo.nickname,
    userNo: TOKEN !== '' && tokenInfo.userNo,
  };
  // console.log('tokenInfo :>> ', tokenInfo);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const toggleLoginModal = (e: React.MouseEvent) => {
    navigate({
      search: `?login`,
    });
    dispatch(open_login(true));
  };

  const loginButtons = (
    <div className={'square-buttons'}>
      <Btn white>{text.regist}</Btn>
      <Btn main onClick={toggleLoginModal}>
        {text.login}
      </Btn>
    </div>
  );

  const userInfoBtn = (
    <Link to={`/mypage/${userInfo.userNo}`}>
      <div className={'user-info'}>
        <span>{userInfo.nickname}</span>
        <span>{text.sir}</span>
        <div className={'photo'}>
          <Img src={'/img/leephoter.png'} />
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
        <button className={'menu'}>{text.boards}</button>
        <button className={'menu'}>{text.notice}</button>
        <button className={'menu'}>{text.inquire}</button>

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
