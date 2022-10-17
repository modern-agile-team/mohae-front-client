import { Dispatch, SetStateAction } from 'react';

interface PresenterProps {
  resetPageInfo: () => void;
  setTarget: Dispatch<SetStateAction<Element | null>>;
  categories: { no: string; name: string }[];
  controlWriteButton: () => void;
  loginPlz: boolean;
  //   setLoginPlz: Dispatch<SetStateAction<boolean>>;
}

interface BoardDetails {
  decimalDay: number | null;
  no: number;
  title: string;
  isDeadline: number;
  photoUrl: string | null;
  price: number | null;
  target: number;
  areaNo: number;
  areaName: string;
  nickname: string;
}

interface BoardResponse {
  response: BoardDetails[];
}

export type { PresenterProps, BoardDetails, BoardResponse };
