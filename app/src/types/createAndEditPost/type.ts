import React, { Dispatch } from 'react';

interface PresenterProps {
  handleAxios: (e: React.MouseEvent) => void;
}

interface ImageInputContainer {
  imgs: string[];
  edit: boolean;
  setImgIndex?: Dispatch<React.SetStateAction<number>>;
}

interface ImageInputPresenter {
  edit: boolean;
  imgBasket: ImgBasket[];
  handlePhotoIndex: (e: React.MouseEvent<HTMLButtonElement>) => void;
  addImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteImg: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setImgIndex?: Dispatch<React.SetStateAction<number>>;
}

interface ImgBasket {
  img: string;
  checked: boolean;
  File: string | Blob | null;
  size?: number;
}

interface InitialState {
  loading: boolean;
  data: PosterInfomation;
  form: FormData;
}

interface PosterInfomation {
  price: number | string;
  title: string;
  description: string;
  summary: string;
  target: number | null;
  categoryNo: string | number | null;
  areaNo: string | number | null;
  deadline: string | number | null;
  imgArr: string[];
}

export type {
  PresenterProps,
  ImageInputContainer,
  InitialState,
  ImageInputPresenter,
  PosterInfomation,
  ImgBasket,
};
