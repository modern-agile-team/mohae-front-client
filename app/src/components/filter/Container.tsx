import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCheck } from '../../redux/filter/reducer';
import { RootState } from '../../redux/root';
import Presenter from './Presenter';
import {
  ContainerProps,
  FilterInitialState,
} from '../../types/searchComponent/filter/type';

interface SetItemCheckParams {
  key: 'target' | 'sort' | 'date' | 'free';
  index: number;
}

function Filter({ setShowFilter, onSubmit }: ContainerProps) {
  const dispatch = useDispatch();
  const filterData: FilterInitialState = useSelector(
    (state: RootState) => state.filter.data,
  );

  const setItemCheck = (param: SetItemCheckParams) => {
    const resetValue = Object.keys(filterData.check[param.key]).map(
      (_: string, __) => {
        return false;
      },
    );

    const newItem = {
      sort: { ...filterData.check.sort },
      target: { ...filterData.check.target },
      date: { ...filterData.check.date },
      free: { ...filterData.check.free },
      [param.key]: {
        ...resetValue,
        [param.index]: !filterData.check[param.key][param.index],
      },
    };
    dispatch(setCheck(newItem));
  };

  return (
    <Presenter
      setItemCheck={setItemCheck}
      onSubmit={onSubmit}
      setShowFilter={setShowFilter}
    />
  );
}

export default Filter;
