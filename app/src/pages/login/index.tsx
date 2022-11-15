/** @format */

import { useSelector } from 'react-redux';
import Presenter from './Presenter';

import { RootState } from '../../redux/root';
import { useState, ReactElement } from 'react';

export default function LoginModal(): ReactElement {
  const isOpenModal = useSelector(
    (state: RootState) => state.specModal.openLogin,
  );
  const [part, setPart] = useState<number>(0);

  const text: { [key: string]: any } = {
    login: '로그인',
    register: '회원가입',
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

  const clickHandler = {
    login: (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setPart(0);
    },
    register: (e: React.MouseEvent) => {
      if (part > 0) return;
      e.preventDefault();
      e.stopPropagation();
      setPart(1);
    },
    enterRegister: (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setPart(2);
    },
    agreement: (e: React.MouseEvent) => {
      setPart(3);
    },
    finishedInputInfo: (e: React.MouseEvent) => {
      setPart(4);
    },
    finishedAll: (e: React.MouseEvent) => {
      setPart(0);
    },
    findPassword: (e: React.MouseEvent) => {
      setPart(5);
    },
  };

  return (
    <Presenter
      text={text}
      isOpenModal={isOpenModal}
      part={part}
      onClick={clickHandler}
      setPart={setPart}
    />
  );
}
