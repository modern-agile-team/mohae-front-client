import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/root';

function useRefactorPostingData() {
  const reduxData = useSelector((state: RootState) => state.createPost.data);

  const refactorPriceData = useMemo((): number => {
    const newData = Number(String(reduxData.price).replace(/,/g, ''));
    return newData;
  }, [reduxData.price]);
  const refactorCategoryNo = useMemo((): number => {
    const newData = Number(reduxData.categoryNo);
    return newData;
  }, [reduxData.categoryNo]);
  const refactorAreaNo = useMemo((): number => {
    const newData = Number(reduxData.areaNo);
    return newData;
  }, [reduxData.areaNo]);
  const refactorDeadline = useMemo((): number => {
    const newData = Number(reduxData.deadline);
    return newData;
  }, [reduxData.deadline]);
  const refactorSummary = useMemo((): string | null => {
    const newData = reduxData.summary === '' ? null : reduxData.summary;
    return newData;
  }, [reduxData.summary]);
  const refactorDescription = useMemo((): string => {
    const newData = reduxData.description;
    return newData;
  }, [reduxData.description]);
  const refactorTitle = useMemo((): string => {
    const newData = reduxData.title;
    return newData;
  }, [reduxData.title]);
  const refactorTarget = useMemo((): number | null => {
    const newData = reduxData.target;
    return newData;
  }, [reduxData.target]);

  const refactorReduxData: { [key: string]: string | number | null } = {
    price: refactorPriceData,
    title: refactorTitle,
    description: refactorDescription,
    summary: refactorSummary,
    target: refactorTarget,
    categoryNo: refactorCategoryNo,
    areaNo: refactorAreaNo,
    deadline: refactorDeadline,
  };

  return refactorReduxData;
}

export default useRefactorPostingData;
