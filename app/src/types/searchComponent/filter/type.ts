import { Dispatch } from 'react';

//------------------------------------------------------------
interface ExtendsTypeForPage {
  setShowFilter: Dispatch<React.SetStateAction<boolean>>;
}

interface ExtendsTypeForSection {
  setItemCheck: (param: {
    key: 'target' | 'sort' | 'date' | 'free';
    index: number;
  }) => void;
}
//------------------------------------------------------------

interface FilterInitialState {
  check: {
    [key: string]: { [key: string]: boolean };
  };
  area: {
    [key: string]: string;
  };
  price: {
    [key: string]: number;
  };
}

interface ObjDataProcessing {
  check: {
    sort: {
      [key: string | number]: string | number | boolean | null;
    };
    target: {
      [key: string]: string | number | boolean | null;
    };
    date: {
      [key: number]: string | number | boolean | null;
    };
    free: { 1: string | number | boolean | null };
  };
  area: {
    areaNo: string | number | boolean | null;
  };
  price: {
    min: string | number | boolean | null;
    max: string | number | boolean | null;
  };
}

interface ContainerProps extends ExtendsTypeForPage {
  setShowFilter: Dispatch<React.SetStateAction<boolean>>;
}

interface PresenterProps extends ExtendsTypeForPage {
  setItemCheck: (param: {
    key: 'target' | 'sort' | 'date' | 'free';
    index: number;
  }) => void;
  onSubmit: (e: React.MouseEvent | React.ChangeEvent, str: string) => void;
  setShowFilter: Dispatch<React.SetStateAction<boolean>>;
}

interface BottomSectionProps extends ExtendsTypeForSection {
  onSubmit: (e: React.ChangeEvent | React.MouseEvent, str: string) => void;
  setShowFilter: Dispatch<React.SetStateAction<boolean>>;
}

export type {
  FilterInitialState,
  ObjDataProcessing,
  ContainerProps,
  PresenterProps,
  BottomSectionProps,
  ExtendsTypeForSection as SectionProps,
};
