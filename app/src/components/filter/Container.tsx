import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCheck, setAreaName, setAreaNo } from '../../redux/filter/reducer';
import { RootState } from '../../redux/root';
import MarkBox from '../markbox/MarkBox';
import Presenter from './Presenter';

interface type {
  [title: string]: any;
}

function Filter() {
  const checked: { [key: string]: { [key: string]: boolean } } = useSelector(
    (state: RootState) => state.filter.data.check
  );
  const area = useSelector((state: RootState) => state.filter.data.area);
  const dispatch = useDispatch();
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000000);
  const [view, setView] = useState<{ [key: number]: boolean }>({ 0: false });

  const resetSetting = () => {
    const resetItem = {
      sort: { 0: false, 1: true, 2: false },
      target: { 0: false, 1: false },
      date: { 0: false, 1: false, 2: false, 3: false },
      free: { 0: false },
    };

    dispatch(setCheck(resetItem));
    dispatch(setAreaName('전체 지역'));
    dispatch(setAreaNo('0'));
  };
  console.log('area :>> ', area);

  const setItemCheck = (list: string, key: string) => {
    const reset = Object.keys(checked[list]).map((el: any, i) => false);

    const newItem = {
      sort: { ...checked.sort },
      target: { ...checked.target },
      date: { ...checked.date },
      free: { ...checked.free },
      [list]: {
        ...reset,
        [key]: !checked[list][key],
      },
    };
    dispatch(setCheck(newItem));
  };
  console.log('checked :>> ', checked);

  const priceRange = (minValue: number, maxValue: number) => {
    if (checked.free[0]) {
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
      minValue={minValue}
      setMinValue={setMinValue}
      maxValue={maxValue}
      setMaxValue={setMaxValue}
      view={view}
      setView={setView}
      setItemCheck={setItemCheck}
      resetSetting={resetSetting}
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
