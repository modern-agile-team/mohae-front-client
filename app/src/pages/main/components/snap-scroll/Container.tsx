import React, { Dispatch, useCallback, useState } from 'react';
import Presenter from './Presenter';

interface ContainerProps {
  contents: React.ReactNode[];
  snapPageNumber: number;
  setSnapPageNumber: Dispatch<React.SetStateAction<number>>;
}

function Container(props: ContainerProps) {
  const { contents, snapPageNumber, setSnapPageNumber } = props;

  const handlePageNumber = (move: number) => {
    contents.forEach((_, index) => {
      if (
        move > 0 &&
        snapPageNumber === index &&
        !(index === contents.length - 1)
      ) {
        console.log('플러스');
        setSnapPageNumber(snapPageNumber + 1);
      } else if (move < 0 && snapPageNumber === index && !(index === 0)) {
        console.log('마이너스');
        setSnapPageNumber(snapPageNumber - 1);
      }
    });
  };

  const wheelHandler = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      contents.forEach((_, index) => {
        if (
          e.deltaY > 10 &&
          snapPageNumber === index &&
          !(index === contents.length - 1)
        ) {
          setTimeout(() => {
            setSnapPageNumber(snapPageNumber + 1);
          }, 700);
        } else if (
          e.deltaY < -10 &&
          snapPageNumber === index &&
          !(index === 0)
        ) {
          setTimeout(() => {
            setSnapPageNumber(snapPageNumber - 1);
          }, 700);
        }
      });
    },
    [contents],
  );

  return <Presenter {...props} wheelHandler={wheelHandler} />;
}

export default Container;

// const wheelHandler = useCallback(
//     (e: React.WheelEvent<HTMLDivElement>) => {
//       contents.forEach((_, index) => {
//         if (
//           e.deltaY > 10 &&
//           snapPageNumber === index &&
//           !(index === contents.length - 1)
//         ) {
//           setTimeout(() => {
//             setSnapPageNumber(snapPageNumber + 1);
//           }, 700);
//         } else if (
//           e.deltaY < -10 &&
//           snapPageNumber === index &&
//           !(index === 0)
//         ) {
//           setTimeout(() => {
//             setSnapPageNumber(snapPageNumber - 1);
//           }, 700);
//         }
//       });
//     },
//     [contents],
//   );
