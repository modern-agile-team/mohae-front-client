import React, { Dispatch } from 'react';

interface TypeForExtends {
  focus: number;
  setFocus: Dispatch<React.SetStateAction<number>>;
}

interface HotBoard {
  area: string;
  decimalDay: number | null;
  isDeadline: number;
  nickname: string;
  no: number;
  photoUrl: string | null;
  price: number;
  target: number;
  title: string;
  userNo: number;
}

interface HotBoardsBasket {
  overall: HotBoard[];
  progressing: HotBoard[];
  closed: HotBoard[];
}

interface PresenterProps extends TypeForExtends {
  hotBoardsBasket: HotBoardsBasket;
}

interface MainProps {
  snapPageNumber: number;
  setSnapPageNumber: Dispatch<React.SetStateAction<number>>;
}

export type {
  MainProps,
  HotBoardsBasket,
  HotBoard,
  PresenterProps,
  TypeForExtends as HotBoardsFilterProps,
};
