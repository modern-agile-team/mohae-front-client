/** @format */

import { useState, useEffect } from 'react';
import { Snap } from '../../components';
import Part1 from './section1';
import Part2 from './section2';
import Part3 from './section3';
import Part4 from './section4';
import { useSearchParams } from 'react-router-dom';

interface Props {
  [key: string]: any;
}

export default function Home(props: Props) {
  const contents = [<Part1 />, <Part2 />, <Part3 />, <Part4 />];
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams('');
  }, []);

  return <Snap contents={contents} />;
}
