import React, { Dispatch } from 'react';

interface TypeForExtends {
  imgs: string[];
  target: number;
  clickMove: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setTarget: Dispatch<React.SetStateAction<number>>;
  setCarouselContentsViewBig: Dispatch<React.SetStateAction<boolean>>;
}

interface PresenterProps extends TypeForExtends {
  carouselContentsViewBig: boolean;
}

interface ArrowButtonsProps {
  clickMove: (e: React.MouseEvent<HTMLButtonElement>) => void;
  usedIn: 'modal' | 'carousel';
}

export type {
  PresenterProps,
  TypeForExtends as ImgComponentsProps,
  ArrowButtonsProps,
};
