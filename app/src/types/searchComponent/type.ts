import { Dispatch, SetStateAction } from 'react';

interface ContainerProps {
  board?: boolean;
  main?: boolean;
  resetPageInfo?: () => void;
}

interface PresenterProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  style: string;
  showFilter: boolean;
  setShowFilter: Dispatch<React.SetStateAction<boolean>>;
  userSearched: string[];
  setUerSearched: Dispatch<React.SetStateAction<string[]>>;
  onSubmit: (
    e: React.MouseEvent | React.FormEvent<HTMLFormElement>,
    str: string,
    searchValue?: string,
  ) => void;
  onBlur: () => void;
  onFocus: () => void;
  showDataList: boolean;
  resetPageInfo?: () => void;
}

export type { ContainerProps, PresenterProps };
