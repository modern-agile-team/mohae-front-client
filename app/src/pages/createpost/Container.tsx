import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import getToken from '../../utils/getToken';
import Presenter from './Presenter';

function CreateAndEditPost() {
  const dispatch = useDispatch();
  const reduxData: { [key: string]: any } = useSelector(
    (state: RootState) => state.createPost.data,
  );
  const form = useSelector((state: RootState) => state.createPost.form);
  const a = form.entries();

  const refactorPriceData = useMemo((): number => {
    return Number(reduxData.price.replace(/,/g, ''));
  }, [reduxData.price]);
  const refactorCategoryNo = useMemo((): number => {
    return Number(reduxData.categoryNo);
  }, [reduxData.categoryNo]);
  const refactorAreaNo = useMemo((): number => {
    return Number(reduxData.areaNo);
  }, [reduxData.areaNo]);
  const refactorDeadline = useMemo((): number => {
    return Number(reduxData.deadline);
  }, [reduxData.deadline]);
  const refactorSummary = useMemo((): string | null => {
    return reduxData.summary === '' ? null : reduxData.summary;
  }, [reduxData.summary]);
  const refactorDescription = useMemo((): string => {
    return reduxData.description;
  }, [reduxData.description]);
  const refactorTitle = useMemo((): string => {
    return reduxData.title;
  }, [reduxData.title]);

  const refactorReduxData: { [key: string]: string | number | null } = {
    price: refactorPriceData,
    title: refactorTitle,
    description: refactorDescription,
    summary: refactorSummary,
    target: reduxData.target,
    categoryNo: refactorCategoryNo,
    areaNo: refactorAreaNo,
    deadline: refactorDeadline,
  };

  const postingAxios = (e: React.MouseEvent) => {
    e.preventDefault();
    for (const key in refactorReduxData) {
      form.set(`${key}`, JSON.stringify(refactorReduxData[key]));
    }

    axios
      .post(`https://mo-hae.site/boards`, form, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then(res => console.log('createpost', res))
      .catch(err => console.log('createpost', err));
  };

  const [view, setView] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
    2: false,
  });
  const [targetChecked, setTargetChecked] = useState<{
    [key: number]: boolean;
  }>({
    0: true,
    1: false,
  });

  const selectBoxClick = (i: number) => {
    setView({ 0: false, 1: false, 2: false, [i]: !view[i] });
  };

  const selectedList = (e?: React.MouseEvent) => {
    console.log(e?.currentTarget.textContent);
    setView({ 0: false, 1: false, 2: false });
  };

  const setTargetCheck = (i: number) => {
    setTargetChecked({ 0: false, 1: false, [i]: !targetChecked[i] });
  };

  return (
    <Presenter
      view={view}
      targetChecked={targetChecked}
      selectBoxClick={selectBoxClick}
      selectedList={selectedList}
      setTargetCheck={setTargetCheck}
      postingAxios={postingAxios}
    />
  );
}

export default CreateAndEditPost;
