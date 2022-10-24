import { Dispatch } from 'react';

//------------------------------------------------------------
interface TypeForExtends {
  used: string;
  userSearched: string[];
  setUerSearched: Dispatch<React.SetStateAction<string[]>>;
  onBlur: () => void;
}
//------------------------------------------------------------

interface HotCategoriesType {
  no: number;
  name: string;
  ranking: number;
}

interface HotCategoriesProps {
  resetPageNation?: () => void;
  onBlur: () => void;
  children: React.ReactNode;
}

interface UserSearchedKeysProps extends TypeForExtends {
  children: React.ReactNode;
  onSubmit: (
    e: React.MouseEvent | React.FormEvent<HTMLFormElement>,
    searchValue: string,
  ) => void;
}

interface DataListProps extends TypeForExtends {
  showDataList: boolean;
  showFilter: boolean;
  resetPageNation?: () => void;
}

export type {
  DataListProps,
  HotCategoriesType,
  HotCategoriesProps,
  UserSearchedKeysProps,
};
