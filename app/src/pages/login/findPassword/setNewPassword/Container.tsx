import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handlePopup } from '../../../../redux/modal/reducer';
import { setNewPassword } from '../../../../apis/changePassword';
import Presenter from './Presenter';
import Succese from '../Succese';

function ChangePassword() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    email: '',
    changePassword: '',
    confirmChangePassword: '',
  });
  const [showHidenPassword, setShowHidenPassword] = useState<{
    [key: string]: boolean;
  }>({ newPassword: false, checkPassword: false });
  const [toSuccesePage, setToSuccesePage] = useState(false);

  const handleHidenPassword = (key: string) => {
    setShowHidenPassword(prev => ({ ...prev, [key]: !showHidenPassword[key] }));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    try {
      await setNewPassword(inputValue, inputValue.email).then(_ =>
        setToSuccesePage(true),
      );
    } catch (err: any) {
      dispatch(handlePopup({ text: '죄송합니다. 다시 시도해주세요.' }));
    }
  };

  return !toSuccesePage ? (
    <Presenter
      inputValue={inputValue}
      showHiden={showHidenPassword}
      handleHiden={handleHidenPassword}
      handleOnChange={handleOnChange}
      onSubmit={onSubmit}
    />
  ) : (
    <Succese />
  );
}

export default ChangePassword;
