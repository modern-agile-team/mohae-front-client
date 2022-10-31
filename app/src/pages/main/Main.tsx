import { useEffect } from 'react';
import { Snap } from '../../components';
import { FirstPage, SecondPage, ThirdPage, FourthPage } from './components';
import { useSearchParams } from 'react-router-dom';
import { MainProps } from '../../types/main/fourthPage/type';

function Main({ snapPageNumber, setSnapPageNumber }: MainProps) {
  const contents = [
    <FirstPage />,
    <SecondPage />,
    <ThirdPage />,
    <FourthPage />,
  ];
  const [_, setSearchParams] = useSearchParams();

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

export default Main;
