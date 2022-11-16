import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation, useParams } from 'react-router-dom';
import Presenter from './Presenter';
import { RootState } from '../../redux/root';
import { useDispatch, useSelector } from 'react-redux';
import { handlePopup } from '../../redux/modal/reducer';
import { setInitialState as setInitialCommentState } from '../../redux/comment/reducer';
import {
  setInitialState as setInitPostState,
  setPostData,
} from '../../redux/post/reducer';
import {
  requestGetPostData,
  requestPostClosing,
  requestPostReopening,
} from '../../apis/post';
import { MainButton, Spinner } from '../../components';
import { removeToken } from '../../utils/getToken';
import { ACCESS_TOKEN, REFESH_TOKEN } from '../../consts/tokenKey';
import { PosterDetails } from '../../types/post/type';
import { open_login } from '../../redux/specModal/reducer';

function Post() {
  const { no } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.post.loading);
  const popupClose = () => {
    dispatch(handlePopup());
    dispatch(open_login(true));
  };
  const { text, children } = {
    text: '로그인 후 이용해주세요.',
    children: (
      <PopupButton>
        <MainButton type="button" able={true} onClick={popupClose}>
          닫기
        </MainButton>
      </PopupButton>
    ),
  };

  const getPostingData = async () => {
    try {
      await requestGetPostData(Number(no)).then(res => {
        if (!res.data.response.authorization) {
          dispatch(handlePopup({ text: text, children: children }));
        }
        dispatch(setPostData({ ...res.data }));
      });
    } catch (err: any) {
      if (err.response.status === 410 || err.response.status === 401) {
        removeToken(ACCESS_TOKEN);
        removeToken(REFESH_TOKEN);
        window.location.replace(location.pathname);
      } else dispatch(handlePopup({ text: text, children: children }));
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
        .then(_ => getPostingData())
        .catch(_ => alert('알 수 없는 에러가 발생하였습니다.'));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getPostingData();
    return () => {
      dispatch(setInitPostState());
      dispatch(setInitialCommentState());
    };
  }, [no]);

  const returnComponent = () => {
    return !loading ? (
      <Presenter requestHandleDeadline={requestHandleDeadline} />
    ) : (
      <Spinner size="big" />
    );
  };

  return <>{returnComponent()}</>;
}

export default Post;

const PopupButton = styled.div`
  width: 74px;
  height: 43px;
`;
