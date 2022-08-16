import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Presenter from './Presenter';
import { decodeToken } from 'react-jwt';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDeadline, setPostData } from '../../redux/post/reducer';
import getToken from '../../utils/getToken';
import { RootState } from '../../redux/root';
import EmptySpinner from '../../components/emptySpinner/EmptySpinner';
import setInterceptors from '../../apis/common/setInterceptors';
import { customAxios } from '../../apis/instance';

export interface Props {
  data: {
    date: string;
    msg: string;
    token: string;
    decoded: Decoded;
    response: Response;
  };
}

interface Decoded {
  email: string;
  exp: number;
  expiration: string;
  iat: number;
  issuer: string;
  nickname: string;
  photoUrl: string;
  userNo: number;
}

interface Response {
  authorization: boolean;
  board: Board;
}

export interface Board {
  areaName: string;
  areaNo: number;
  boardPhotoUrls: string | null;
  categoryName: string;
  categoryNo: number;
  decimalDay: number | null;
  description?: string;
  hit: number;
  deadline: number;
  isDeadline: number;
  isLike?: boolean | null | number;
  likeCount: number;
  majorName: string;
  nickname: string;
  no: number;
  price: number;
  summary: null | string;
  target: number;
  title: string;
  userNo: number;
  userPhotoUrl: string;
}

function Post() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { no } = useParams();
  const dispatch = useDispatch();
  const token = getToken() || null;
  const decoded = () => {
    return token !== null ? decodeToken(token) : token;
  };
  const [view, setView] = useState<{ [key: string]: boolean }>({
    report: false,
    isDeadline: false,
  });
  const loading = useSelector((state: RootState) => state.post.loading);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    setInterceptors(customAxios)
      .get(`boards/${no}`, config)
      .then(res => {
        const visitor = res.data.msg
          .replace(/[^회원|^비회원]/g, '')
          .substring(1, 4);
        dispatch(
          setPostData({
            ...res.data,
            msg: visitor,
            decoded: decoded(),
            token: token,
          }),
        );
      })
      .catch(err => err);
  }, []);

  const requestHandleDeadline = (data: Board) => {
    const URL = !data.isDeadline ? `boards/close/${no}` : `boards/cancel/${no}`;

    setInterceptors(customAxios)
      .patch(URL, null, config)
      .then(res => {
        setView({ ...view, isDeadline: true });
        dispatch(setIsDeadline());
      })
      .catch(err => console.log('err', err));
  };

  const returnComp = () => {
    return !loading ? (
      <Presenter
        view={view}
        setView={(str: string) => {
          setView({ ...view, [str]: !view[str] });
        }}
        requestHandleDeadline={requestHandleDeadline}
      />
    ) : (
      <EmptySpinner loading />
    );
  };

  return <>{returnComp()}</>;
}

export default Post;
