import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { customAxios } from '../../apis/instance';
import setInterceptors from '../../apis/common/setInterceptors';
import EmptySpinner from '../../components/emptySpinner/EmptySpinner';
import useRefactorPostingData from '../../customhook/useRefactorPostingData';
import { setForEdit, setLoading } from '../../redux/createpost/reducer';
import { setInitialState } from '../../redux/createpost/reducer';
import { RootState } from '../../redux/root';
import { ENDPOINT } from '../../utils/ENDPOINT';
import getToken from '../../utils/getToken';
import Presenter from './Presenter';

interface Props {
  type: string;
}

interface StateForEdit {
  [key: string]: string | number | null | string[] | never[];
}

function CreateAndEditPost({ type }: Props) {
  const { no } = useParams();
  const dispatch = useDispatch();
  const loadingState = useSelector(
    (state: RootState) => state.createPost.loading,
  );
  const form = useSelector((state: RootState) => state.createPost.form);
  const refactorReduxData = useRefactorPostingData();
  const [stateForEdit, setStateForEdit] = useState<StateForEdit>();
  const [popupView, setPopupView] = useState(false);
  const [view, setView] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
    2: false,
  });
  const [targetChecked, setTargetChecked] = useState<{
    [key: number]: boolean;
  }>({ 0: true, 1: false });

  useEffect(() => {
    if (type === 'edit') {
      setInterceptors(customAxios)
        .get(`${ENDPOINT}boards/${no}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
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
          setTargetChecked(
            Number(beforeEdit.target) === 1
              ? { 0: false, 1: true }
              : { 0: true, 1: false },
          );
        })
        .catch(err => console.log('err', err));
    } else dispatch(setLoading(false));

    return () => {
      dispatch(setInitialState());
    };
  }, []);

  const requestAxios = (type: string) => {
    const URL =
      type === 'create'
        ? `https://mo-hae.site/boards`
        : `https://mo-hae.site/boards/${no}`;
    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getToken()}`,
      },
    };
    const axiosPostOrPatch =
      type === 'create'
        ? setInterceptors(customAxios).post
        : setInterceptors(customAxios).patch;

    axiosPostOrPatch(URL, form, config)
      .then(res => {
        setPopupView(true);
      })
      .catch(err => {
        type === 'create' ? alert('작성 실패') : alert('수정 실패');
      });
  };

  const postingAxios = (e: React.MouseEvent, type: string) => {
    e.preventDefault();

    if (type === 'edit') {
      for (const key in stateForEdit) {
        if (key !== 'imgArr') {
          refactorReduxData[key] !== stateForEdit[key]
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
      const file = new File(['logo.png'], 'logo.png', {
        type: 'image/jpg',
      });
      form.append('image', file);
    }

    // console.log('price :>> ', form.getAll('price'));
    // console.log('title :>> ', form.getAll('title'));
    // console.log('description :>> ', form.getAll('description'));
    // console.log('target :>> ', form.getAll('target'));
    // console.log('categoryNo :>> ', form.getAll('categoryNo'));
    // console.log('deadline :>> ', form.getAll('deadline'));
    // console.log('areaNo :>> ', form.getAll('areaNo'));
    // console.log('image :>> ', form.getAll('image'));

    requestAxios(type);
  };

  const selectBoxClick = (i: number) => {
    setView({ 0: false, 1: false, 2: false, [i]: !view[i] });
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
          popupView={popupView}
          selectBoxClick={selectBoxClick}
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
