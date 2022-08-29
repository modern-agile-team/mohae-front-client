/** @format */

import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { color, radius, font, shadow } from '../../styles';
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
} from '../../components';
import Title from './Title';
import Completion from './Completion';

export default function Request() {
  const text: { [key: string]: any } = {
    title: '회원 탈퇴',
    description: {
      1: '님의 안전한',
      2: '를 위해',
      3: '비밀번호를 입력해 주세요.',
    },
    sub: '시 모든 정보가 삭제되며, 복구되지 않습니다.',
    password: '비밀번호',
    inputPw: '비밀번호를 입력해 주세요',
    resign: '탈퇴',
    cancel: '취소',
  };

  return (
    <>
      <div className={'description'}>
        <span className={'bold main'}>{'닉네임~'}</span>
        <span> {text.description[1]}</span>
        <span className={'main'}> {text.title}</span>
        <span> {text.description[2]}</span>
        <div className={'row'}>
          <span className={'main'}> {text.description[3]}</span>
        </div>
      </div>
      <div className={'sub'}>
        <span className={'main'}>{text.title}</span>
        <span className={'lightgray'}>{text.sub}</span>
      </div>
      <div className={'write'}>
        <label htmlFor={'password'}>{text.password}</label>
        <input
          id={'password'}
          type="password"
          placeholder={text.inputPw}
        ></input>
      </div>
      <div className={'btns'}>
        <div>
          <Btn disable>{text.resign}</Btn>
        </div>
        <div>
          <Btn>{text.cancel}</Btn>
        </div>
      </div>
    </>
  );
}
