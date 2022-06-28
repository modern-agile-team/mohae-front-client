/** @format */

import { useSelector, useDispatch } from 'react-redux';
import Presenter from './Presenter';
import Login from './login/Login';
import Register from './register';
import { RootState } from '../../redux/root';
import { open_login } from '../../redux/modal/reducer';

interface Props {
  [key: string]: any;
}

export default function LoginModal({}: Props) {
  const isOpenModal = useSelector((state: RootState) => state.modal.openLogin);

  const text: { [key: string]: any } = {
    login: '로그인',
    placeholder: {
      id: '이메일을 입력해 주세요',
      pw: '비밀번호를 입력해 주세요',
    },
    stayLogin: '로그인 상태 유지',
    forgotPw: '비밀번호 찾기',
    description: '당신의 재능을 펼칠 수 있는',
    mohae: '모해',
    subDesc: `지금 회원가입 후 ‘모해’의 다양한 서비스를 만나보세요.`,
    signUp: '가입하기',
  };

  return (
    <Presenter isOpenModal={isOpenModal}>
      <Login text={text} />
    </Presenter>
  );
}
