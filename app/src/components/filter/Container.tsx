import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCheck } from '../../redux/filter/reducer';
import { RootState } from '../../redux/root';
import Presenter from './Presenter';
import {
  ContainerProps,
  FilterInitialState,
  ObjDataProcessing,
} from '../../types/searchComponent/filter/type';
import { useParams, useSearchParams } from 'react-router-dom';

interface SetItemCheckParams {
  key: 'target' | 'sort' | 'date' | 'free';
  index: number;
}

function Filter({ setShowFilter }: ContainerProps) {
  const dispatch = useDispatch();
  const { check, area, price }: FilterInitialState = useSelector(
    (state: RootState) => state.filter.data,
  );
  const { no } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const getParams = (query: string): any => {
    return searchParams.get(query);
  };
  const changeNull = (filteringValue: boolean | number | string) => {
    if (
      filteringValue === false ||
      filteringValue === 0 ||
      filteringValue === 1000000
    ) {
      return null;
    } else return filteringValue;
  };

  const objDataProcessing: ObjDataProcessing = {
    check: {
      sort: {
        1: changeNull(check.sort[0]),
        DESC: changeNull(check.sort[1]),
        ASC: changeNull(check.sort[2]),
      },
      target: {
        0: changeNull(check.target[0]),
        1: changeNull(check.target[1]),
      },
      date: {
        7: changeNull(check.date[0]),
        30: changeNull(check.date[1]),
        60: changeNull(check.date[2]),
        0: changeNull(check.date[3]),
      },
      free: { 1: changeNull(check.free[0]) },
    },
    area: {
      areaNo: changeNull(area.areaNo),
    },
    price: {
      min: changeNull(price.min),
      max: changeNull(price.max),
    },
  };

  const sortQuery = () => {
    if (objDataProcessing.check.sort[1] !== null) {
      return '&popular=1';
    } else
      return (
        '&sort=' +
        Object.keys(objDataProcessing.check.sort)
          .map((el, i) => {
            if (objDataProcessing.check.sort[el] !== null) {
              return Object.keys(objDataProcessing.check.sort)[i];
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

  const handlePriceQuery = () => {
    return {
      min:
        objDataProcessing.check.free[1] === null
          ? objDataProcessing.price.min
          : null,
      max:
        objDataProcessing.check.free[1] === null
          ? objDataProcessing.price.max
          : null,
    };
  };

  const onSubmitTest = (
    e: React.MouseEvent | React.FormEvent<HTMLFormElement> | React.ChangeEvent,
  ) => {
    const query = `?categoryNo=${no}&title=${getParams(
      'title',
    )}${sortQuery()}&target=${drawObjKey(
      objDataProcessing.check.target,
    )}&date=${drawObjKey(objDataProcessing.check.date)}&free=${drawObjKey(
      objDataProcessing.check.free,
    )}&min=${handlePriceQuery().min}&max=${handlePriceQuery().max}&areaNo=${
      objDataProcessing.area.areaNo
    }`;
    e.preventDefault();

    setSearchParams(query);
  };

  const setItemCheck = (param: SetItemCheckParams) => {
    const resetValue = Object.keys(check[param.key]).map((_: string, __) => {
      return false;
    });

    const newItem = {
      sort: { ...check.sort },
      target: { ...check.target },
      date: { ...check.date },
      free: { ...check.free },
      [param.key]: {
        ...resetValue,
        [param.index]: !check[param.key][param.index],
      },
    };
    dispatch(setCheck(newItem));
  };

  return (
    <Presenter
      setItemCheck={setItemCheck}
      onSubmit={onSubmitTest}
      setShowFilter={setShowFilter}
    />
  );
}

export default Filter;
