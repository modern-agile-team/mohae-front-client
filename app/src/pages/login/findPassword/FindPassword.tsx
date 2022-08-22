import styled from '@emotion/styled';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Popup } from '../../../components';
import AuthModal from '../../../components/modal/AuthModal';
import { ENDPOINT } from '../../../utils/ENDPOINT';

interface Props {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

function FindPassword(props: Props) {
  const { visible, setVisible } = props;
  const [userInputValue, setUserInputValue] = useState({
    name: '',
    email: '',
  });
  const [popupInfo, setPopupInfo] = useState({ view: false, message: '' });

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
    await axios
      .post(`${ENDPOINT}email/forget/password`, userInputValue)
      .then(res => {
        setPopupInfo({ ...popupInfo, view: true, message: res.data.msg });
      })
      .catch(err =>
        setPopupInfo({
          view: true,
          message: '이름이나 이메일을 확인해주세요.',
        }),
      );
  };

  const closePopup = () => {
    setPopupInfo({ ...popupInfo, view: false });
  };

  return (
    <>
      <AuthModal big={false} visible={visible}>
        <Container onSubmit={e => sendEmail(e)}>
          <section>
            <p>비밀번호 찾기</p>
            <p>가입 시 입력하신 이메일을 통해 찾을 수 있습니다.</p>
            <Line />
          </section>
          <section>
            <label>이름</label>
            <Input
              value={userInputValue.name}
              onChange={e => handleOnChange('name', e)}
            />
          </section>
          <section>
            <label>이메일</label>
            <Input
              type={'email'}
              value={userInputValue.email}
              onChange={e => handleOnChange('email', e)}
            />
          </section>
          <SubmitButton able={submitAble()} onSubmit={e => sendEmail(e)}>
            비밀번호 찾기
          </SubmitButton>
        </Container>
      </AuthModal>
      {popupInfo.view && (
        <Popup visible={popupInfo.view} text1={popupInfo.message}>
          <PopupCloseButton type="submit" onClick={closePopup}>
            닫기
          </PopupCloseButton>
        </Popup>
      )}
    </>
  );
}

export default FindPassword;

const Container = styled.form`
  height: 329px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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
`;

const PopupCloseButton = styled.button`
  width: 74px;
  height: 43px;
  background-color: #ff445e;
  color: white;
  border-radius: 6px;
`;
