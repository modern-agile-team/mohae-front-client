/** @format */

import { useSelector, useDispatch } from 'react-redux';
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
} from '../../components';
import { radius, font, color, shadow } from '../../styles';
import { css, cx } from '@emotion/css';

export default function Login() {
  const style = css`
    width: 100%;
    height: 100%;
    ${radius[24]};
    padding: 45px 228px 100px;
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
      display: flex;
      justify-content: space-between;
      margin: 16px 0 24px;
    }
    > .btn {
      width: 100%;
      height: 52px;
    }
  `;

  return (
    <BasicModal small visible={true}>
      <div className={cx(style)}>
        <div className={'logo'}>
          <Img src={'/img/logo.png'} />
        </div>
        <ul className={'menu'}>
          <button>로그인</button>
          <button>회원가입</button>
        </ul>
        <FocusBar thin />
        <div className={'input'}>
          <div className={'icon'}>
            <Img src={'/img/id.png'} />
          </div>
          <input placeholder="이메일을 입력해주세요" />
        </div>
        <div className={'input'}>
          <div className={'icon'}>
            <Img src={'/img/password.png'} />
          </div>
          <input placeholder="비밀번호를 입력해 주세요" />
        </div>
        <div className={'option'}>
          <div>
            <input id="keep-login" type="checkbox" />
            <label htmlFor="keep-login">로그인 상태유지</label>
          </div>
          <button>비번찾기</button>
        </div>
        <Box size={[480, 52]}>
          <Btn main>로그인</Btn>
        </Box>
      </div>
    </BasicModal>
  );
}
