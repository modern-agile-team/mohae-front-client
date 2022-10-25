import { useEffect, Dispatch, SetStateAction } from 'react';
import { Snap } from '../../components';
import { FirstPage, SecondPage, ThirdPage, FourthPage } from './components';
import { useSearchParams } from 'react-router-dom';

interface Props {
  snapPageNumber: number;
  setSnapPageNumber: Dispatch<SetStateAction<number>>;
}

function Main({ snapPageNumber, setSnapPageNumber }: Props) {
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
