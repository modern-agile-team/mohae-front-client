import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EmptySpinner from '../../components/emptySpinner/EmptySpinner';
import { setForEdit, setLoading } from '../../redux/createpost/reducer';
import { RootState } from '../../redux/root';
import getToken from '../../utils/getToken';
import Presenter from './Presenter';

interface Props {
  type: string;
}

function CreateAndEditPost({ type }: Props) {
  const { no } = useParams();
  const dispatch = useDispatch();
  const loadingState = useSelector(
    (state: RootState) => state.createPost.loading,
  );
  const reduxData: { [key: string]: any } = useSelector(
    (state: RootState) => state.createPost.data,
  );
  const postingData = useSelector(
    (state: RootState) => state.post.data.response.board,
  );
  const dataBeforeeEdit: { [key: string]: any } = {
    price: String(Number(postingData.price).toLocaleString()),
    title: postingData.title,
    description: postingData.description,
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

  useEffect(() => {
    if (type === 'edit') {
      dispatch(setForEdit(dataBeforeeEdit));
    } else dispatch(setLoading(false));
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

  console.log('dataBeforeeEdit :>> ', dataBeforeeEdit);
  console.log('refactorReduxData :>> ', refactorReduxData);

  const postingAxios = (e: React.MouseEvent, type: string) => {
    e.preventDefault();

    if (type === 'edit') {
      for (const key in dataBeforeeEdit) {
        if (key !== 'imgArr') {
          refactorReduxData[key] !== dataBeforeeEdit[key]
            ? form.set(`${key}`, JSON.stringify(refactorReduxData[key]))
            : form.set(`${key}`, JSON.stringify(null));
        }
      }
    } else {
      for (const key in refactorReduxData) {
        form.set(`${key}`, JSON.stringify(refactorReduxData[key]));
      }
    }

    if (form.getAll('image').length === 0) {
      const file = new File(['logo.jpg'], 'logo.jpg', {
        type: 'image/jpg',
      });
      form.append('image', file);
    }

    console.log('image :>> ', form.getAll('image'));
    console.log('price :>> ', form.getAll('price'));
    console.log('title :>> ', form.getAll('title'));
    console.log('description :>> ', form.getAll('description'));
    console.log('summary :>> ', form.getAll('summary'));
    console.log('target :>> ', form.getAll('target'));
    console.log('categoryNo :>> ', form.getAll('categoryNo'));
    console.log('areaNo :>> ', form.getAll('areaNo'));
    console.log('deadline :>> ', form.getAll('deadline'));

    type === 'create'
      ? axios
          .post(`https://mo-hae.site/boards`, form, {
            headers: {
              accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${getToken()}`,
            },
          })
          .then(res => res)
          .catch(err => {
            console.log('err.data :>> ', err);
            type === 'create' ? alert('작성 실패') : alert('수정 실패');
          })
      : axios
          .patch(`https://mo-hae.site/boards/${no}`, form, {
            headers: {
              accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${getToken()}`,
            },
          })
          .then(res => res)
          .catch(err => {
            console.log('err.data :>> ', err);
            type === 'create' ? alert('작성 실패') : alert('수정 실패');
          });
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
    <>
      {!loadingState ? (
        <Presenter
          view={view}
          targetChecked={targetChecked}
          selectBoxClick={selectBoxClick}
          selectedList={selectedList}
          setTargetCheck={setTargetCheck}
          postingAxios={postingAxios}
          type={type}
        />
      ) : (
        <EmptySpinner loading />
      )}
    </>
  );
}

export default CreateAndEditPost;
