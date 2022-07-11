import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Presenter from './Presenter';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import { setPostData } from '../../redux/post/reducer';

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
  isLike?: boolean;
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
  const { no } = useParams();
  const dispatch = useDispatch();
  const reduxData = useSelector((state: RootState) => state.post.data);

  const token =
    // /*subro*/ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTm8iOjEsImVtYWlsIjoic3Vicm9AbmF2ZXIuY29tIiwibmlja25hbWUiOiJobmVlZGRqamRlIiwicGhvdG9VcmwiOiJodHRwczovL21vaGFlcHJvai5zMy5hbWF6b25hd3MuY29tL3Byb2ZpbGUvMTY1NTk2MzczODQ5MF9kb2VrY3JpbWcuUE5HIiwiaXNzdWVyIjoibW9kZXJuLWFnaWxlIiwiZXhwaXJhdGlvbiI6IjM2MDAwIiwiaWF0IjoxNjU2OTg1Nzg0LCJleHAiOjE2NTcwMjE3ODR9.thVCKfXz4xPz7BxzmUog6BjwimKQ_uH1soPBtZ6lLKY';
    /*wer06099*/ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTm8iOjIsImVtYWlsIjoid2VyMDYwOTlAbmF2ZXIuY29tIiwibmlja25hbWUiOiIxMDBfc2IiLCJwaG90b1VybCI6InByb2ZpbGUvMTY1NTE4NDIzNDE2NV9cdTAwMDTvv70477-9UO-_vS5qcGciLCJpc3N1ZXIiOiJtb2Rlcm4tYWdpbGUiLCJleHBpcmF0aW9uIjoiMzYwMDAiLCJpYXQiOjE2NTY5ODU4MzQsImV4cCI6MTY1NzAyMTgzNH0.J5uQImwBROoCk8smbwkAMhf-ZPS7ESzZuCSaS9hYiVM';
  // /*비회원*/ null;
  const decoded = () => {
    return token !== null ? jwt_decode(token) : token;
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
          })
        );
      })
      .catch(err => console.log('err', err));
  }, []);

  return (
    <>
      <Presenter data={reduxData} />
    </>
  );
}

export default Post;
