import React from 'react';

interface FindPasswordProps {
  userInputValue: {
    name: string;
    email: string;
  };
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  requestSendEmail: (
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>,
  ) => void;
}

interface SetNewPasswordProps {
  inputValue: {
    email: string;
    changePassword: string;
    confirmChangePassword: string;
  };
  showHiden: { [key: string]: boolean };
  handleHiden: (key: string) => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>,
  ) => void;
}

export type { FindPasswordProps, SetNewPasswordProps };
