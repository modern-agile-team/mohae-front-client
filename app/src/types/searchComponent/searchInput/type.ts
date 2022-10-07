import { Dispatch } from 'react';

interface SearchInputProps {
  setShowFilter?: Dispatch<React.SetStateAction<boolean>>;
  showFilter?: boolean;
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, str: string) => void;
  onBlur: () => void;
  onFocus: () => void;
  style: string;
}

export type { SearchInputProps };
