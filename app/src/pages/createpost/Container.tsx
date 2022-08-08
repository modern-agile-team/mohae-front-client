import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EmptySpinner from '../../components/emptySpinner/EmptySpinner';
import useRefactorPostingData from '../../customhook/useRefactorPostingData';
import { setForEdit, setLoading } from '../../redux/createpost/reducer';
import { setInitialState } from '../../redux/post/reducer';
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
      axios
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
            deadline: null,
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
    const axiosPostOrPatch = type === 'create' ? axios.post : axios.patch;

    axiosPostOrPatch(URL, form, config)
      .then(res => {
        dispatch(setInitialState());
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
    requestAxios(type);
  };

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

// console.log('price :>> ', form.getAll('price'));
// console.log('title :>> ', form.getAll('title'));
// console.log('description :>> ', form.getAll('description'));
// console.log('target :>> ', form.getAll('target'));
// console.log('categoryNo :>> ', form.getAll('categoryNo'));
// console.log('deadline :>> ', form.getAll('deadline'));
// console.log('areaNo :>> ', form.getAll('areaNo'));
// console.log('image :>> ', form.getAll('image'));
