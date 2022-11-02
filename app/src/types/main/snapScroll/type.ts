import React, { Dispatch } from 'react';

interface TypeForExtends {
  contents: React.ReactNode[];
  snapPageNumber: number;
  setSnapPageNumber: Dispatch<React.SetStateAction<number>>;
}

interface PresenterProps extends TypeForExtends {
  wheelHandler: (e: React.WheelEvent<HTMLDivElement>) => void;
}

export type { TypeForExtends as ContainerProps, PresenterProps };
