/** @format */

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Snap } from '../../components';
import Part1 from './section1';
import Part2 from './section2';
import Part3 from './section3';
import Part4 from './section4';
import { useSearchParams } from 'react-router-dom';

interface Props {
  snapPageNumber: number;
  setSnapPageNumber: Dispatch<SetStateAction<number>>;
}

export default function Home({ snapPageNumber, setSnapPageNumber }: Props) {
  const contents = [<Part1 />, <Part2 />, <Part3 />, <Part4 />];
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams('');
    return () => {
      setSnapPageNumber(0);
    };
  }, []);

  return (
    <Snap
      snapPageNumber={snapPageNumber}
      setSnapPageNumber={setSnapPageNumber}
      contents={contents}
    />
  );
}
