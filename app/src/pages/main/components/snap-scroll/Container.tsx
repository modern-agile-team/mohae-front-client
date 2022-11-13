import React, { useRef } from 'react';
import Presenter from './Presenter';
import { ContainerProps } from '../../../../types/main/snapScroll/type';

function Container(props: ContainerProps) {
  const { contents, snapPageNumber: pageNum, setSnapPageNumber } = props;
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handlePageNumber = (move: number) => {
    contents.forEach((_, i) => {
      if (move > 30 && pageNum === i && !(i === contents.length - 1)) {
        setSnapPageNumber(prev => prev + 1);
      } else if (move < -30 && pageNum === i && i !== 0) {
        setSnapPageNumber(prev => prev - 1);
      }
    });
  };

  const throttlingScroll = (e: React.WheelEvent) => {
    if ((pageNum === 0 && e.deltaY < 0) || (pageNum === 3 && e.deltaY > 0))
      return;

    if (!timer.current) {
      timer.current = setTimeout(() => {
        handlePageNumber(e.deltaY);
        timer.current = null;
      }, 500);
    }
  };

  return <Presenter {...props} wheelHandler={throttlingScroll} />;
}

export default Container;
