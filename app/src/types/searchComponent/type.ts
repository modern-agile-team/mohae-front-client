import React, { Dispatch, SetStateAction } from 'react';

interface ContainerProps {
  board?: boolean;
  main?: boolean;
  resetPageNation?: () => void;
}

interface PresenterProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  style: string;
  userSearched: string[];
  setUerSearched: Dispatch<React.SetStateAction<string[]>>;
  onSubmit: (
    e: React.MouseEvent | React.FormEvent<HTMLFormElement> | React.ChangeEvent,
    str: string,
    searchValue?: string,
  ) => void;
  resetPageNation?: () => void;
}

export type { ContainerProps, PresenterProps };
