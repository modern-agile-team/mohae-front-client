/** @format */

import { Img, Box, Btn } from '../../../components';
import { useState } from 'react';

import axios from 'axios';

import { open_login } from '../../../redux/modal/reducer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/root';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../../../utils/ENDPOINT';

interface Props {
  [key: string]: any;
}

export default function Register({ text }: Props) {
  const [inputValue, setInputValue] = useState({
    id: sessionStorage.getItem('userEmail') || '',
    password: '',
  });
  const isOpenLogin = useSelector((state: RootState) => state.modal.openLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const requestLogin = (e: any) => {
    e.preventDefault();
    axios
      .post(
        `${ENDPOINT}auth/signin`,
        { email: inputValue.id, password: inputValue.password },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        if (res.data.statusCode >= 200 && res.data.statusCode <= 204) {
          sessionStorage.setItem('userAccessToken', res.data.response);
          navigate('/');

          dispatch(open_login(!isOpenLogin));
          // console.log(`1`, 1);
          // 모달 내리기
        } else {
          alert('이메일과 비밀번호를 다시 확인해주세요.');
        }
      })
      .catch(err => {
        alert(err.response.data.error.message);
      });
  };

  return (
    <form onSubmit={requestLogin}>
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
    </form>
  );
}
