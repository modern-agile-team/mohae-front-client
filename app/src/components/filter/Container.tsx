import React, { Dispatch, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCheck, resetFilteringSetting } from '../../redux/filter/reducer';
import { RootState } from '../../redux/root';
import MarkBox from '../markbox/MarkBox';
import Presenter from './Presenter';

interface type {
  [title: string]: any;
}

interface Props {
  setShowFilter: Dispatch<React.SetStateAction<boolean>>;
  showFilter: boolean;
  onSubmit: (e: any, str: string) => void;
}

function Filter({ setShowFilter, showFilter, onSubmit }: Props) {
  const filterData: any = useSelector((state: RootState) => state.filter.data);
  const dispatch = useDispatch();
  const [view, setView] = useState<{ [key: number]: boolean }>({ 0: false });

  const resetSetting = () => {
    dispatch(resetFilteringSetting());
  };

  const setItemCheck = (list: string, key: string) => {
    const reset = Object.keys(filterData.check[list]).map(
      (el: any, i) => false,
    );

    const newItem = {
      sort: { ...filterData.check.sort },
      target: { ...filterData.check.target },
      date: { ...filterData.check.date },
      free: { ...filterData.check.free },
      [list]: {
        ...reset,
        [key]: !filterData.check[list][key],
      },
    };
    dispatch(setCheck(newItem));
  };

  const priceRange = (minValue: number, maxValue: number) => {
    if (filterData.check.free[0]) {
      return `무료`;
    }
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
      priceRange={priceRange}
      view={view}
      setView={setView}
      setItemCheck={setItemCheck}
      resetSetting={resetSetting}
      onSubmit={onSubmit}
      setShowFilter={setShowFilter}
      showFilter={showFilter}
    />
  );
}

export default Filter;
export type { type };

const contents: type = {
  sort: ['인기순', '최신순', '오래된순'],
  target: [
    <>
      <MarkBox shape={0} state={0} />
      해줄래요
    </>,
    <>
      <MarkBox shape={1} state={0} />
      구할래요
    </>,
  ],
  date: ['1주일', '1개월', '3개월', '상시'],
  free: ['무료'],
};

const texts: type = {
  top: ['정렬', '대상'],
  mid: ['기간', '지역'],
};
