import React, { useState } from 'react';
import { customAxios } from '../../../apis/instance';
import { ENDPOINT } from '../../../utils/ENDPOINT';
import Presenter from './Presenter';
import Succese from './Succese';

function ChangePassword() {
  const [inputValue, setInputValue] = useState({
    email: '',
    changePassword: '',
    confirmChangePassword: '',
  });
  const [showHidenPassword, setShowHidenPassword] = useState<{
    [key: string]: boolean;
  }>({ new: false, check: false });
  const [popupInfo, setPopupInfo] = useState({ view: false, message: '' });
  const [toSuccesePage, setToSuccesePage] = useState(false);

  const handleHidenPassword = (key: string) => {
    setShowHidenPassword(prev => {
      return { ...prev, [key]: !showHidenPassword[key] };
    });
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    setInputValue(prev => {
      return { ...prev, [key]: e.target.value };
    });
  };

  const submitAble = () => {
    if (
      inputValue.email.length &&
      inputValue.changePassword.length &&
      inputValue.confirmChangePassword.length
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    try {
      await customAxios
        .patch(`${ENDPOINT}auth/forget/password`, inputValue, {
          headers: { key: inputValue.email },
        })
        .then(res => {
          setToSuccesePage(true);
        });
    } catch (err: any) {
      setPopupInfo({ view: true, message: err.response.data.error.message });
    }
  };

  const closePopup = () => {
    setPopupInfo({ view: false, message: '' });
  };

  return !toSuccesePage ? (
    <Presenter
      inputValue={inputValue}
      popupInfo={popupInfo}
      showHidenPassword={showHidenPassword}
      handleHidenPassword={handleHidenPassword}
      handleOnChange={handleOnChange}
      submitAble={submitAble}
      onSubmit={onSubmit}
      closePopup={closePopup}
    />
  ) : (
    <Succese />
  );
}

export default ChangePassword;
