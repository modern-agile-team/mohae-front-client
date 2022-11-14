import React, { useCallback, useEffect, useState } from 'react';
import { requestCreate, requestEdit } from '../../apis/createAndEditPost';
import useRefactorPostingData from '../../customhook/useRefactorPostingData';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  setInfoBeforeEdit,
  setLoading,
  setInitialState,
} from '../../redux/createpost/reducer';
import { RootState } from '../../redux/root';
import { requestGetPostData } from '../../apis/post';
import { PosterDetails } from '../../types/post/type';
import { Spinner } from '../../components';
import Presenter from './Presenter';

interface StateForEdit {
  [key: string]: string | number | null | string[] | never[];
}

function CreateAndEditPost() {
  const { no } = useParams();
  const dispatch = useDispatch();
  const { loading, form } = useSelector((state: RootState) => state.createPost);
  const refactorReduxData = useRefactorPostingData();
  const [stateForEdit, setStateForEdit] = useState<StateForEdit>();
  const [popupView, setPopupView] = useState(false);

  const savePostInfomation = useCallback((info: PosterDetails) => {
    const cloudFrontURL = 'https://d2ffbnf2hpheay.cloudfront.net/';
    return {
      price: String(Number(info.price).toLocaleString()),
      title: info.title,
      description: info.description || '',
      summary: info.summary === null ? '' : info.summary,
      target: info.target,
      categoryNo: info.categoryNo,
      areaNo: info.areaNo,
      deadline: info.deadline,
      imgArr:
        info.boardPhotoUrls !== null
          ? info.boardPhotoUrls
              .split(', ')
              .map((el: string) => cloudFrontURL + el)
          : [],
    };
  }, []);

  useEffect(() => {
    if (no) {
      requestGetPostData(Number(no))
        .then(res => {
          setStateForEdit(savePostInfomation(res.data.response.board));
          dispatch(
            setInfoBeforeEdit(savePostInfomation(res.data.response.board)),
          );
        })
        .catch(_ => alert('알 수 없는 에러 발생.'));
    } else dispatch(setLoading(false));

    return () => {
      dispatch(setInitialState());
    };
  }, []);

  const requestForEdit = () => {
    for (const key in stateForEdit) {
      if (key !== 'imgArr') {
        refactorReduxData[key] !== stateForEdit[key]
          ? form.set(`${key}`, JSON.stringify(refactorReduxData[key]))
          : form.set(`${key}`, JSON.stringify(null));
      }
    }

    requestEdit(Number(no), form)
      .then(_ => setPopupView(true))
      .catch(_ => alert('수정 실패'));
  };

  const requestForCreate = () => {
    for (const key in refactorReduxData) {
      form.set(`${key}`, JSON.stringify(refactorReduxData[key]));
    }

    requestCreate(form)
      .then(_ => setPopupView(true))
      .catch(_ => alert('작성 실패'));
  };

  const thereIsNoImg = () => {
    const file = new File(['logo.png'], 'logo.png', {
      type: 'image/jpg',
    });
    form.append('image', file);
  };

  const handleAxios = (e: React.MouseEvent) => {
    e.preventDefault();
    if (form.getAll('image').length === 0) thereIsNoImg();
    no ? requestForEdit() : requestForCreate();
  };

  return (
    <>
      {!loading ? (
        <Presenter popupView={popupView} handleAxios={handleAxios} />
      ) : (
        <Spinner size="big" />
      )}
    </>
  );
}

export default CreateAndEditPost;
