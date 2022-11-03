import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/root';

function useRefactorPostingData(): { [key: string]: string | number | null } {
  const {
    price,
    categoryNo,
    areaNo,
    deadline,
    summary,
    description,
    title,
    target,
  } = useSelector((state: RootState) => state.createPost.data);

  const refactorPriceData = useMemo((): number => {
    const newData = Number(String(price).replace(/,/g, ''));
    return newData;
  }, [price]);

  const refactorCategoryNo = useMemo((): number => {
    const newData = Number(categoryNo);
    return newData;
  }, [categoryNo]);

  const refactorAreaNo = useMemo((): number => {
    const newData = Number(areaNo);
    return newData;
  }, [areaNo]);

  const refactorDeadline = useMemo((): number => {
    const newData = Number(deadline);
    return newData;
  }, [deadline]);

  const refactorSummary = useMemo((): string | null => {
    const newData = summary === '' ? null : summary;
    return newData;
  }, [summary]);

  const refactorDescription = useMemo((): string => {
    const newData = description;
    return newData;
  }, [description]);

  const refactorTitle = useMemo((): string => {
    const newData = title;
    return newData;
  }, [title]);

  const refactorTarget = useMemo((): number | null => {
    const newData = target;
    return newData;
  }, [target]);

  return {
    price: refactorPriceData,
    title: refactorTitle,
    description: refactorDescription,
    summary: refactorSummary,
    target: refactorTarget,
    categoryNo: refactorCategoryNo,
    areaNo: refactorAreaNo,
    deadline: refactorDeadline,
  };
}

export default useRefactorPostingData;
