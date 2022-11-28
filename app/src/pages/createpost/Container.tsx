import React, { useCallback, useEffect, useState } from 'react';
import { requestCreate, requestEdit } from '../../apis/createAndEditPost';
import useRefactorPostingData from '../../customhook/useRefactorPostingData';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { handlePopup } from '../../redux/modal/reducer';
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
  const dispatch = useDispatch();
  const { no } = useParams();
  const refactorReduxData = useRefactorPostingData();
  const { loading, form } = useSelector((state: RootState) => state.createPost);
  const [stateForEdit, setStateForEdit] = useState<StateForEdit>();
  const popupContents = {
    text: `게시글이 ${no ? '수정' : '작성'} 되었습니다.`,
    sub: {
      action: () => window.location.replace('/boards/categories/1'),
      text: '게시판으로',
    },
  };

  const savePostInfo = useCallback((info: PosterDetails) => {
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
              .map((url: string) => cloudFrontURL + url)
          : [],
    };
  }, []);

  useEffect(() => {
    if (no) {
      requestGetPostData(Number(no))
        .then(res => {
          setStateForEdit(savePostInfo(res.data.response.board));
          dispatch(setInfoBeforeEdit(savePostInfo(res.data.response.board)));
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
      .then(_ => dispatch(handlePopup(popupContents)))
      .catch(_ => alert('수정 실패'));
  };

  const requestForCreate = () => {
    for (const key in refactorReduxData) {
      form.set(`${key}`, JSON.stringify(refactorReduxData[key]));
    }

    requestCreate(form)
      .then(_ => dispatch(handlePopup(popupContents)))
      .catch(_ => alert('작성 실패'));
  };

  const thereIsNoImg = () => {
    const file = new File(['logo.png'], 'logo.png', {
      type: 'image/png',
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
        <Presenter handleAxios={handleAxios} />
      ) : (
        <Spinner size="big" />
      )}
    </>
  );
}

export default CreateAndEditPost;
