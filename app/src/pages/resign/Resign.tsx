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

export default function OtherPage() {
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

  const style = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${radius[24]}
    .logo {
      width: 66.4px;
      height: 50px;
      margin-bottom: 24px;
    }
    .main {
      color: ${color.main};
    }
    .bold {
      ${font.weight[700]};
      font-size: 24px;
    }
    .description {
      font-size: 24px;
      color: ${color.dark1};
      margin-bottom: 16px;
    }
    .lightgray {
      color: ${color.dark3};
    }
    .row {
      display: flex;
      justify-content: center;
    }
    .sub {
      margin-bottom: 40px;
    }
    .write {
      display: flex;
      align-items: center;
      margin-bottom: 40px;
      label {
        color: ${color.dark1};
        width: 97px;
        text-align: center;
      }
      input {
        width: 350px;
        color: ${color.dark2};
        padding: 16px;
        font-size: 14px;
        ${radius[6]};
        ${shadow.inputGray};
      }
    }
    .btns {
      display: flex;
      > div {
        width: 74px;
        height: 43px;
      }
      > :not(:last-child) {
        margin-right: 8px;
      }
      align-items: center;
    }
  `;

  const component = (
    <div className={cx(style)}>
      <div className={'logo'}>
        <Img src={'/img/logo.png'} />
      </div>
      <div className={'bold'}>{text.title}</div>
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
    </div>
  );

  return <BasicModal small visible={true} contents={component} />;
}
