import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import { SelectBtn } from '../button';
import MarkBox from '../markbox/MarkBox';
import Presenter from './Presenter';

interface type {
  [title: string]: string[] | React.ReactNode[];
}

function Filter() {
  // const checked = useSelector((state: RootState) => state.filter);
  // console.log('checked :>> ', checked);
  const contents: type = {
    정렬: ['인기순', '최신순', '오래된순'],
    대상: [
      <>
        <MarkBox shape={0} state={0} />
        해줄래요
      </>,
      <>
        <MarkBox shape={1} state={0} />
        구할래요
      </>,
    ],
    기간: ['1주일', '1개월', '3개월', '상시'],
    무료: ['무료'],
  };

  const texts: type = {
    top: ['정렬', '대상'],
    mid: ['기간', '지역'],
  };
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000000);
  const [view, setView] = useState<{ [key: number]: boolean }>({ 0: false });
  const [filterChecked, setFilterChecked] = useState<{
    [key: string]: { [key: number]: boolean | undefined };
  }>(
    JSON.parse(
      localStorage.getItem('filterChecked') ||
        JSON.stringify({
          정렬: { 0: false, 1: true, 2: false },
          대상: { 0: false, 1: false },
          기간: { 0: false, 1: false, 2: false, 3: false },
          무료: { 0: false },
        })
    )
  );

  useEffect(() => {
    localStorage.setItem(
      'filterChecked',
      JSON.stringify({
        정렬: { 0: false, 1: true, 2: false },
        대상: { 0: false, 1: false },
        기간: { 0: false, 1: false, 2: false, 3: false },
        무료: { 0: false },
      })
    );
  }, []);

  const setItemCheck = (list: string, i: number) => {
    const newItem = {
      정렬: { ...filterChecked.정렬 },
      대상: { ...filterChecked.대상 },
      기간: { ...filterChecked.기간 },
      무료: { ...filterChecked.무료 },
      [list]: {
        0: false,
        1: false,
        2: false,
        3: false,
        [i]: !filterChecked[list][i],
      },
    };

    localStorage.setItem('filterChecked', JSON.stringify(newItem));
    setFilterChecked(newItem);
  };

  const priceArea = (minValue: number, maxValue: number) => {
    if (0 < minValue && maxValue < 1000000) {
      return `${minValue.toLocaleString()} 원 ~ ${maxValue.toLocaleString()} 원`;
    }
    if (minValue > 0) {
      return `${minValue.toLocaleString()} 원 이상`;
    }
    if (maxValue < 1000000) {
      return `${maxValue.toLocaleString()} 원 이하`;
    }

    return '모든 가격대';
  };
  return (
    <Presenter
      contents={contents}
      texts={texts}
      priceArea={priceArea}
      minValue={minValue}
      setMinValue={setMinValue}
      maxValue={maxValue}
      setMaxValue={setMaxValue}
      view={view}
      setView={setView}
      filterChecked={filterChecked}
      setItemCheck={setItemCheck}
    />
  );
}

export default Filter;
export type { type };
