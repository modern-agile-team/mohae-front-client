import { Dispatch } from 'react';

// ******Posting DATA TYPES******
interface PostData {
  data: {
    date: string;
    response: Response;
  };
}

interface Response {
  authorization: boolean;
  board: Board;
}

interface Board {
  areaName: string;
  areaNo: number;
  boardPhotoUrls: string | null;
  categoryName: string;
  categoryNo: number;
  decimalDay: number | null;
  description?: string;
  hit: number;
  createdAt: string;
  endDate: string | null;
  deadline: number;
  isDeadline: number;
  isLike?: boolean | null | number;
  likeCount: number;
  majorName: string;
  nickname: string;
  no: number;
  price: number;
  summary: null | string;
  target: number;
  title: string;
  userNo: number;
  userPhotoUrl: string;
}

interface ModalViewState {
  report: boolean;
  isDeadline: boolean;
  mustLogin: boolean;
}
// ******Posting DATA TYPES******

// ******ComponentsProps TYPES******
interface PresenterProps {
  requestHandleDeadline: (data: Board) => void;
  modalView: { report: boolean; isDeadline: boolean; mustLogin: boolean };
  setModalView: Dispatch<React.SetStateAction<ModalViewState>>;
}

interface PageComponetsProps {
  handleReportModalView: () => void;
}

interface PostUserInteractionProps {
  requestDeleteFunc: () => void;
}
// ******ComponentsProps TYPES******

export type {
  PostData,
  Response,
  Board,
  ModalViewState,
  PresenterProps,
  PageComponetsProps,
  PostUserInteractionProps,
};