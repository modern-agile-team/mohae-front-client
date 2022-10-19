import { Dispatch, SetStateAction } from 'react';

interface PresenterProps {
  resetPageNation: () => void;
  setTarget: Dispatch<SetStateAction<Element | null>>;
}

interface ContentsProps {
  setTarget: Dispatch<SetStateAction<Element | null>>;
}

interface InteractionPartProps {
  resetPageNation: () => void;
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

export type {
  PresenterProps,
  ContentsProps,
  InteractionPartProps,
  BoardDetails,
  BoardResponse,
};
