import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setForEdit } from '../../redux/createpost/reducer';
import { RootState } from '../../redux/root';
import getToken from '../../utils/getToken';
import Presenter from './Presenter';

interface Props {
  type: string;
}

function CreateAndEditPost({ type }: Props) {
  const dispatch = useDispatch();
  const reduxData: { [key: string]: any } = useSelector(
    (state: RootState) => state.createPost.data,
  );
  const postingData = useSelector(
    (state: RootState) => state.post.data.response.board,
  );

  useEffect(() => {
    const obj = {
      price: String(Number(postingData.price).toLocaleString()),
      title: postingData.title,
      description: '',
      summary: postingData.summary === null ? '' : postingData.summary,
      target: postingData.target,
      categoryNo: postingData.categoryNo,
      areaNo: postingData.areaNo,
      deadline: null,
      imgArr:
        postingData.boardPhotoUrls !== null && postingData.boardPhotoUrls !== ''
          ? postingData.boardPhotoUrls.split(', ').map(el => {
              return 'https://d2ffbnf2hpheay.cloudfront.net/' + el;
            })
          : [],
    };
    console.log('obj :>> ', obj);
    dispatch(setForEdit(obj));
  }, []);
  const form = useSelector((state: RootState) => state.createPost.form);

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
      .then(res => res)
      .catch(err => alert('작성 실패'));
  };

  const [view, setView] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
    2: false,
  });
  const [targetChecked, setTargetChecked] = useState<{
    [key: number]: boolean;
  }>(
    reduxData.target
      ? {
          0: false,
          1: true,
        }
      : {
          0: true,
          1: false,
        },
  );

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
      type={type}
    />
  );
}

export default CreateAndEditPost;
