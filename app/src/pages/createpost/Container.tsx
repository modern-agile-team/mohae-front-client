import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { customAxios } from '../../apis/instance';
import setInterceptors from '../../apis/common/setInterceptors';
import useRefactorPostingData from '../../customhook/useRefactorPostingData';
import {
  setForEdit,
  setLoading,
  setInitialState,
} from '../../redux/createpost/reducer';
import { RootState } from '../../redux/root';
import { ENDPOINT } from '../../utils/ENDPOINT';
import Presenter from './Presenter';
import { Spinner } from '../../components';

interface Props {
  type: string;
}

interface StateForEdit {
  [key: string]: string | number | null | string[] | never[];
}

function CreateAndEditPost({ type }: Props) {
  const { no } = useParams();
  const dispatch = useDispatch();
  const { loading, form } = useSelector((state: RootState) => state.createPost);
  const refactorReduxData = useRefactorPostingData();
  const [stateForEdit, setStateForEdit] = useState<StateForEdit>();
  const [popupView, setPopupView] = useState(false);

  useEffect(() => {
    if (type === 'edit') {
      setInterceptors(customAxios)
        .get(`${ENDPOINT}boards/${no}`)
        .then(res => {
          const data = res.data.response.board;
          const beforeEdit = {
            price: String(Number(data.price).toLocaleString()),
            title: data.title,
            description: data.description,
            summary: data.summary === null ? '' : data.summary,
            target: data.target,
            categoryNo: data.categoryNo,
            areaNo: data.areaNo,
            deadline: data.deadline,
            imgArr:
              data.boardPhotoUrls !== null && data.boardPhotoUrls !== ''
                ? data.boardPhotoUrls.split(', ').map((el: any) => {
                    return 'https://d2ffbnf2hpheay.cloudfront.net/' + el;
                  })
                : [],
          };
          setStateForEdit(beforeEdit);
          dispatch(setForEdit(beforeEdit));
        })
        .catch(err => console.log('err', err));
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
    if (form.getAll('image').length === 0) {
      const file = new File(['logo.png'], 'logo.png', {
        type: 'image/jpg',
      });
      form.append('image', file);
    }

    setInterceptors(customAxios)
      .patch(`https://mo-hae.site/boards/${no}`, form)
      .then(_ => setPopupView(true))
      .catch(_ => alert('수정 실패'));
  };

  const requestForCreate = () => {
    for (const key in refactorReduxData) {
      form.set(`${key}`, JSON.stringify(refactorReduxData[key]));
    }

    if (form.getAll('image').length === 0) {
      const file = new File(['logo.png'], 'logo.png', {
        type: 'image/jpg',
      });
      form.append('image', file);
    }

    setInterceptors(customAxios)
      .post(`https://mo-hae.site/boards`, form)
      .then(_ => setPopupView(true))
      .catch(_ => alert('작성 실패'));
  };

  const postingAxios = (e: React.MouseEvent, type: string) => {
    e.preventDefault();

    no ? requestForEdit() : requestForCreate();
  };

  return (
    <>
      {!loading ? (
        <Presenter
          popupView={popupView}
          postingAxios={postingAxios}
          type={type}
        />
      ) : (
        <Spinner size="big" />
      )}
    </>
  );
}

export default CreateAndEditPost;
