/** @format */
import { Img, Box } from '../../../components';
import React, { useState } from 'react';
import { open_login } from '../../../redux/specModal/reducer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/root';
import { useLocation } from 'react-router-dom';
import { loginCheck } from '../../../utils/loginCheck';
import { login } from '../../../apis/auth';
import { setToken } from '../../../utils/getToken';
import { ACCESS_TOKEN, REFESH_TOKEN } from '../../../consts/tokenKey';

interface Props {
  text: {
    login: string;
    register: string;
    placeholder: {
      id: string;
      pw: string;
    };

    forgotPw: string;
    description: string;
    mohae: string;
    subDesc: string;
    signUp: string;
  };
  setFindPasswordView: React.Dispatch<React.SetStateAction<boolean>>;
}

const result = 0;

export default function Register({ text, setFindPasswordView }: Props) {
  const [inputValue, setInputValue] = useState({
    id: '',
    password: '',
  });
  const isOpenLogin = useSelector(
    (state: RootState) => state.specModal.openLogin,
  );
  const dispatch = useDispatch();
  const location = useLocation();

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

    login({ email: inputValue.id, password: inputValue.password })
      .then(res => {
        if (res.data.statusCode >= 200 && res.data.statusCode <= 204) {
          setToken(ACCESS_TOKEN, res.data.response.accessToken);
          setToken(REFESH_TOKEN, res.data.response.refreshToken);
          window.location.replace(location.pathname);
          loginCheck();

          dispatch(open_login(!isOpenLogin));
        } else {
          alert('이메일과 비밀번호를 다시 확인해주세요.');
        }
      })
      .catch(err => {
        alert(err.response.data.error.message);
      });
  };

  const findPassword = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFindPasswordView(true);
  };

  return (
    <form onSubmit={requestLogin}>
      <div className={'input'}>
        <div className={'icon'}>
          <Img src={'/img/id.png'} alt="id-input-icon" />
        </div>
        <input
          placeholder={text.placeholder.id}
          value={inputValue.id}
          onChange={handleId}
        />
      </div>
      <div className={'input'}>
        <div className={'icon'}>
          <Img src={'/img/password.png'} alt="password-input-icon" />
        </div>
        <input
          placeholder={text.placeholder.pw}
          onChange={handlePW}
          value={inputValue.password}
          type={'password'}
        />
      </div>
      <div className={'loginoption'}>
        <button id="find-password" type="button" onClick={e => findPassword(e)}>
          {text.forgotPw}
        </button>
      </div>
      <Box size={[480, 52]}>
        <button id="submit-btn" type="submit" onClick={requestLogin}>
          {text.login}
        </button>
      </Box>
    </form>
  );
}
