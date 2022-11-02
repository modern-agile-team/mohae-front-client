import styled from '@emotion/styled';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { ENDPOINT } from '../../../utils/ENDPOINT';

interface PopupInfo {
  view: boolean;
  message: string;
}

interface Props {
  popupInfo: { register: PopupInfo; findPassword: PopupInfo };
  setPopupInfo: Dispatch<
    SetStateAction<{ register: PopupInfo; findPassword: PopupInfo }>
  >;
}

function FindPassword({ popupInfo, setPopupInfo }: Props) {
  const [userInputValue, setUserInputValue] = useState({
    name: '',
    email: '',
  });

  const handleOnChange = (
    str: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setUserInputValue({ ...userInputValue, [str]: e.target.value });
  };

  const submitAble = () => {
    if (userInputValue.email.length && userInputValue.name.length) {
      return true;
    } else {
      return false;
    }
  };

  const sendEmail = async (
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    try {
      await axios
        .post(`${ENDPOINT}email/forget/password`, userInputValue)
        .then(res => {
          setPopupInfo({
            ...popupInfo,
            findPassword: { view: true, message: res.data.msg },
          });
          setUserInputValue({ name: '', email: '' });
        });
    } catch (err: any) {
      setPopupInfo({
        ...popupInfo,
        findPassword: { view: true, message: err.response.data.error.message },
      });
    }
  };

  return (
    <Container onSubmit={e => sendEmail(e)}>
      <section>
        <p>비밀번호 찾기</p>
        <p>가입 시 입력하신 이메일을 통해 찾을 수 있습니다.</p>
        <Line />
      </section>
      <section>
        <label>이름</label>
        <Input
          placeholder="이름을 입력해 주세요."
          value={userInputValue.name}
          onChange={e => handleOnChange('name', e)}
        />
      </section>
      <section>
        <label>이메일</label>
        <Input
          placeholder="이메일을 입력해 주세요."
          type={'email'}
          value={userInputValue.email}
          onChange={e => handleOnChange('email', e)}
        />
      </section>
      <SubmitButton
        able={submitAble()}
        type="submit"
        onSubmit={e => sendEmail(e)}
      >
        비밀번호 찾기
      </SubmitButton>
    </Container>
  );
}

export default FindPassword;

const response = 1;

const Container = styled.form`
  height: 329px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 68px;
  p:nth-of-type(1) {
    font-size: 24px;
    font-weight: 700;
    color: #ff445e;
  }
  p:nth-of-type(2) {
    font-size: 14px;
    font-weight: 400;
    color: #4f4e5c;
    margin-bottom: 16px;
  }
  section:nth-of-type(1) {
    text-align: center;
  }
  section:nth-of-type(2),
  section:nth-of-type(3) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  label {
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    width: 96px;
    color: #4f4e5c;
  }
`;

const Line = styled.hr`
  width: 480px;
  height: 6px;
  background-color: #e7e7e8;
`;

const Input = styled.input`
  width: 384px;
  height: 52px;
  border-radius: 6px;
  box-shadow: inset 0px 0px 8px rgba(132, 131, 141, 0.2);
  padding: 16px;
`;

const SubmitButton = styled.button<{ able: boolean }>`
  width: 480px;
  height: 52px;
  background-color: ${props => (props.able ? '#ff445e' : '#E7E7E8')};
  color: white;
  font-size: 14px;
  border-radius: 6px;
  box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
`;
