import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { RootState } from '../../redux/root';
import Presenter from './Presenter';
import {
  FilterInitialState,
  ObjDataProcessing,
} from '../../types/searchComponent/filter/type';
import { ContainerProps } from '../../types/searchComponent/type';

function Search(props: ContainerProps) {
  const { board, main, resetPageInfo } = props;
  const [value, setValue] = useState<string>('');
  const [userSearched, setUerSearched] = useState<string[]>(
    JSON.parse(localStorage.getItem('currentSearch') || '[]'),
  );
  const { no } = useParams();
  const filterData: FilterInitialState = useSelector(
    (state: RootState) => state.filter.data,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [showDataList, setShowDataList] = useState(false);
  const navigate = useNavigate();
  const getParams = (query: string): any => {
    return searchParams.get(query);
  };

  const onBlur = () => {
    setShowDataList(false);
  };

  const onFocus = () => {
    if (showFilter) {
      return;
    } else {
      setShowDataList(true);
    }
  };

  const objDataProcessing = (): ObjDataProcessing => {
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

  const titleQuery = (historyValue?: string) => {
    if (historyValue) {
      return historyValue;
    } else if (value) {
      return value;
    } else {
      return decodeURIComponent(getParams('title'));
    }
  };

  const onSubmit = (
    e: React.MouseEvent | React.FormEvent<HTMLFormElement>,
    str: string,
    historyValue?: string,
  ) => {
    onBlur();
    if (searchParams.get('title') === value) {
      e.preventDefault();
      setValue('');
      return;
    }
    const query = `?categoryNo=${no || 1}&title=${titleQuery(
      historyValue,
    )}${sortQuery()}&target=${drawObjKey(
      objDataProcessing().check.target,
    )}&date=${drawObjKey(objDataProcessing().check.date)}&free=${drawObjKey(
      objDataProcessing().check.free,
    )}&min=${objDataProcessing().check.free[1]}&max=${
      objDataProcessing().check.free[1]
    }&areaNo=${objDataProcessing().area.areaNo}`;
    e.preventDefault();

    if (str === 'search') {
      if (value.length > 1) {
        setSearchParams(query);
        if (main) {
          navigate('boards/categories/1' + query);
        }
        localStorage.setItem(
          'currentSearch',
          JSON.stringify([value, ...userSearched]),
        );
        setUerSearched(
          JSON.parse(localStorage.getItem('currentSearch') || '[]'),
        );
        setValue('');
        resetPageInfo && resetPageInfo();
      } else {
        alert('두 글자 이상 검색 가능합니다.');
        setValue('');
      }
    } else {
      setSearchParams(query);
      resetPageInfo && resetPageInfo();
    }
  };

  return (
    <Presenter
      style={board ? 'board' : 'main'}
      value={value}
      setValue={setValue}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
      userSearched={userSearched}
      setUerSearched={setUerSearched}
      onSubmit={onSubmit}
      onBlur={onBlur}
      onFocus={onFocus}
      showDataList={showDataList}
      resetPageInfo={resetPageInfo}
    />
  );
}

export { Search };
