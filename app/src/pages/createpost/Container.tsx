import axios from 'axios';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import getToken from '../../utils/getToken';
import Presenter from './Presenter';

function CreateAndEditPost() {
  const reduxData: { [key: string]: any } = useSelector(
    (state: RootState) => state.createPost.data,
  );
  const form = useSelector((state: RootState) => state.createPost.form);
  const a = form.entries();

  const refactorPriceData = useMemo((): number => {
    const newData = Number(reduxData.price.replace(/,/g, ''));
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

    if (form.getAll('image').length === 0) {
      const file = new File(['logo.jpg'], 'logo.jpg', {
        type: 'image/jpg',
      });
      form.append('image', file);
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

interface InitialState {
  data: {
    price: number | string;
    title: string;
    description: string;
    summary: string;
    target: number | null;
    categoryNo: string | number | null;
    areaNo: string | number | null;
    deadline: string | number | null;
    imgArr: string[];
  };
  form: FormData;
}

const initialState: InitialState = {
  data: {
    price: '0', // 정수형
    title: '', // '제목'
    description: '', // '본문 내용'
    summary: '', //없으면 null || '한 줄 요약 내용'
    target: 0, // 0, 1 === 정수형
    categoryNo: null, // 정수형
    areaNo: null, // 정수형
    deadline: null, // 정수형
    imgArr: ['logo.jpg'], // string[]
  },
  form: new FormData(),
};
