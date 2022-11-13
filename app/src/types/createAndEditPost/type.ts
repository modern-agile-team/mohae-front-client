import React, { Dispatch } from 'react';

interface PresenterProps {
  popupView: boolean;
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

export type {
  PresenterProps,
  ImageInputContainer,
  ImageInputPresenter,
  ImgBasket,
};
