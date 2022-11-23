import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestEmail } from '../../../../apis/changePassword';
import { handlePopup } from '../../../../redux/modal/reducer';
import Presenter from './Presenter';

function Container() {
  const dispatch = useDispatch();
  const [userInputValue, setUserInputValue] = useState({
    name: '',
    email: '',
  });

  const handlePopupText = (text: string) => {
    dispatch(handlePopup({ text: text }));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputValue({
      ...userInputValue,
      [e.currentTarget.name]: e.target.value,
    });
  };

  const requestSendEmail = async (
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    try {
      await requestEmail(userInputValue).then(res => {
        setUserInputValue({ name: '', email: '' });
        handlePopupText(res.data.msg);
      });
    } catch (err: any) {
      handlePopupText(err.response.data.error.message);
    }
  };

  return (
    <Presenter
      userInputValue={userInputValue}
      handleOnChange={handleOnChange}
      requestSendEmail={requestSendEmail}
    />
  );
}

export default Container;
