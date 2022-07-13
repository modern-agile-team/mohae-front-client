import React, { Dispatch, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { setCheck, setAreaName, setAreaNo } from '../../redux/filter/reducer';
import { RootState } from '../../redux/root';
import MarkBox from '../markbox/MarkBox';
import Presenter from './Presenter';

interface type {
  [title: string]: any;
}

interface Props {
  setShowFilter: Dispatch<React.SetStateAction<boolean>>;
  showFilter: boolean;
}

function Filter({ setShowFilter, showFilter }: Props) {
  const filterData: any = useSelector((state: RootState) => state.filter.data);
  const { no } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
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

  const objDataProcessing = (): any => {
    const changeNull = (filteringValue: boolean | number | string) => {
      if (
        filteringValue === false ||
        filteringValue === 0 ||
        filteringValue === 1000000
      ) {
        return null;
      } else return filteringValue;
    };

    return {
      check: {
        sort: {
          1: changeNull(filterData.check.sort[0]),
          DESC: changeNull(filterData.check.sort[1]),
          ASC: changeNull(filterData.check.sort[2]),
        },
        target: {
          0: changeNull(filterData.check.target[0]),
          1: changeNull(filterData.check.target[1]),
        },
        date: {
          7: changeNull(filterData.check.date[0]),
          30: changeNull(filterData.check.date[1]),
          60: changeNull(filterData.check.date[2]),
          0: changeNull(filterData.check.date[3]),
        },
        free: { 1: changeNull(filterData.check.free[0]) },
      },
      area: {
        areaNo: changeNull(filterData.area.areaNo),
      },
      price: {
        min: changeNull(filterData.price.min),
        max: changeNull(filterData.price.max),
      },
    };
  };

  const sortQuery = () => {
    if (objDataProcessing().check.sort[1] !== null) {
      return '&popular=1';
    } else
      return (
        '&sort=' +
        Object.keys(objDataProcessing().check.sort)
          .map((el, i) => {
            if (objDataProcessing().check.sort[el] !== null) {
              return Object.keys(objDataProcessing().check.sort)[i];
            }
          })
          .filter(el => el)[0]
      );
  };

  const drawObjKey = (obj: any) => {
    const value = Object.keys(obj)
      .map((el, i) => {
        if (obj[el] !== null) {
          return Object.keys(obj)[i];
        }
      })
      .filter(el => el)[0];
    return value ? value : null;
  };

  const onSubmit = (e: any) => {
    const titleQuery = () => {
      return (
        searchParams.get('title') !== null &&
        `&title=${searchParams.get('title')}`
      );
    };

    const query = `?categoryNo=${no}${titleQuery()}${sortQuery()}&target=${drawObjKey(
      objDataProcessing().check.target,
    )}&date=${drawObjKey(objDataProcessing().check.date)}&free=${drawObjKey(
      objDataProcessing().check.free,
    )}&min=${
      objDataProcessing().check.free[1] === null
        ? objDataProcessing().price.min
        : null
    }&max=${
      objDataProcessing().check.free[1] === null
        ? objDataProcessing().price.max
        : null
    }&areaNo=${objDataProcessing().area.areaNo}`;
    e.preventDefault();

    setSearchParams(query);
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
