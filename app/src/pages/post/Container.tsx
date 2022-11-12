import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Presenter from './Presenter';
import { useDispatch, useSelector } from 'react-redux';
import {
  setInitialState as setInitialPostState,
  setPostData,
} from '../../redux/post/reducer';
import { RootState } from '../../redux/root';
import { setInitialState as setInitialCommentState } from '../../redux/comment/reducer';
import { PosterDetails, ModalViewState } from '../../types/post/type';
import {
  requestGetPostData,
  requestPostClosing,
  requestPostReopening,
} from '../../apis/post';
import { Spinner } from '../../components';
import { removeToken } from '../../utils/getToken';
import { ACCESS_TOKEN, REFESH_TOKEN } from '../../consts/tokenKey';

function Post() {
  const { no } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.post.loading);
  const [modalView, setModalView] = useState<ModalViewState>({
    report: false,
    isDeadline: false,
    mustLogin: false,
  });

  const getPostingData = async () => {
    try {
      await requestGetPostData(Number(no)).then(res => {
        if (!res.data.response.authorization) {
          setModalView({ ...modalView, mustLogin: true });
        }
        dispatch(
          setPostData({
            ...res.data,
          }),
        );
      });
    } catch (err: any) {
      if (err.response.status === 410 || err.response.status === 401) {
        removeToken(ACCESS_TOKEN);
        removeToken(REFESH_TOKEN);
        window.location.replace(location.pathname);
      }
    }
  };

  const requestHandleDeadline = (data: PosterDetails) => {
    const handlingRequest = !data.isDeadline
      ? requestPostClosing
      : requestPostReopening;

    const date = new Date().toISOString();

    if (data.endDate && data.endDate < date) {
      return;
    } else {
      handlingRequest(Number(no))
        .then(_ => {
          setModalView(prev => {
            return { ...prev, isDeadline: true };
          });
          getPostingData();
        })
        .catch(_ => alert('알 수 없는 에러가 발생하였습니다.'));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getPostingData();
    return () => {
      dispatch(setInitialPostState());
      dispatch(setInitialCommentState());
    };
  }, [no]);

  const returnComponent = () => {
    return !loading ? (
      <Presenter
        modalView={modalView}
        setModalView={setModalView}
        requestHandleDeadline={requestHandleDeadline}
      />
    ) : (
      <Spinner size="big" />
    );
  };

  return <>{returnComponent()}</>;
}

export default Post;
