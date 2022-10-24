import { Dispatch } from 'react';

interface TypeForExtends {
  setShowFilter?: Dispatch<React.SetStateAction<boolean>>;
  showFilter?: boolean;
  onBlur: () => void;
  onFocus: () => void;
  used: string;
}

interface ContainerProps extends TypeForExtends {
  userSearched: string[];
  setUerSearched: Dispatch<React.SetStateAction<string[]>>;
}

interface PresenterProps extends TypeForExtends {
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export type { ContainerProps, PresenterProps };
