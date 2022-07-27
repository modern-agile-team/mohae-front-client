import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Presenter from './Presenter';
import { decodeToken } from 'react-jwt';
import { useDispatch } from 'react-redux';
import { setPostData } from '../../redux/post/reducer';
import getToken from '../../utils/getToken';

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

interface Board {
  areaName: string;
  areaNo: number;
  boardPhotoUrls: string | null;
  categoryName: string;
  categoryNo: number;
  decimalDay: number | null;
  description?: string;
  hit: number;
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

  useEffect(() => {
    axios
      .get(`https://mo-hae.site/boards/${no}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
      .catch(err => console.log('err', err));
  }, []);

  return (
    <>
      <Presenter />
    </>
  );
}

export default Post;
