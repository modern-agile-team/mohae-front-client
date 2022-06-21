/** @format */

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
  Report,
} from '../../../components';
import { useState, useEffect } from 'react';
import { radius, font, color, shadow } from '../../../styles';
import { css, cx } from '@emotion/css';
import { decodeToken } from 'react-jwt';
import axios from 'axios';

interface Props {
  [key: string]: any;
}

export default function Register({ text }: Props) {
  const [inputValue, setInputValue] = useState({
    id: '',
    password: '',
  });
  const [token, setToken] = useState<any>('');

  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      id: e.currentTarget.value,
    });
  };

  const handlePW = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      password: e.currentTarget.value,
    });
  };

  const requestLogin = () => {
    axios
      .post(
        `https://mo-hae.site/auth/signin`,
        { email: inputValue.id, password: inputValue.password },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        // console.log(`res`, res.data.success);
        res.data.success &&
          sessionStorage.setItem('isAuthorized', res.data.response);
        setToken(decodeToken(res.data.response));
        // res.data.response >> token
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  };

  let isAuthorized = sessionStorage;

  return (
    <>
      <div className={'input'}>
        <div className={'icon'}>
          <Img src={'/img/id.png'} />
        </div>
        <input
          placeholder={text.placeholder.id}
          value={inputValue.id}
          onChange={handleId}
        />
      </div>
      <div className={'input'}>
        <div className={'icon'}>
          <Img src={'/img/password.png'} />
        </div>
        <input
          placeholder={text.placeholder.pw}
          onChange={handlePW}
          value={inputValue.password}
          type={'password'}
        />
      </div>
      <div className={'option'}>
        <div>
          <input id="keep-login" type="checkbox" />
          <label htmlFor="keep-login">{text.stayLogin}</label>
        </div>
        <button>{text.forgotPw}</button>
      </div>
      <Box size={[480, 52]}>
        <Btn main onClick={requestLogin}>
          {text.login}
        </Btn>
      </Box>
    </>
  );
}
