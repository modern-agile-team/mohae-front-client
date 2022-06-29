import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Presenter from './Presenter';
import jwt_decode from 'jwt-decode';

export interface Props {
  data?: {
    date: string;
    msg: string;
    token: string;
    decoded: {
      email: string;
      exp: number;
      expiration: string;
      iat: number;
      issuer: string;
      nickname: string;
      photoUrl: string;
      userNo: number;
    };
    response: {
      authorization: boolean;
      board: {
        areaName: string;
        areaNo: number;
        boardPhotoUrls: string | null;
        categoryName: string;
        categoryNo: number;
        decimalDay: number | null;
        description?: string;
        hit: number;
        isDeadline: number;
        isLike?: number;
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
      };
    };
  };
}

function Post() {
  const [data, setData] = useState();
  const { no } = useParams();

  const token =
    // /*subro*/ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTm8iOjEsImVtYWlsIjoic3Vicm9AbmF2ZXIuY29tIiwibmlja25hbWUiOiJobmVlZGRqamRlIiwicGhvdG9VcmwiOiJodHRwczovL21vaGFlcHJvai5zMy5hbWF6b25hd3MuY29tL3Byb2ZpbGUvMTY1NTk2MzczODQ5MF9kb2VrY3JpbWcuUE5HIiwiaXNzdWVyIjoibW9kZXJuLWFnaWxlIiwiZXhwaXJhdGlvbiI6IjM2MDAwIiwiaWF0IjoxNjU2NDc3NzY3LCJleHAiOjE2NTY1MTM3Njd9.pLOhW3kIwYqSLan6On6yM3PRBM8MsApr9BTFowlV74Y';
    /*wer06099*/ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTm8iOjIsImVtYWlsIjoid2VyMDYwOTlAbmF2ZXIuY29tIiwibmlja25hbWUiOiJobmVlZGRqc2pkZSIsInBob3RvVXJsIjoicHJvZmlsZS8xNjU1MTg0MjM0MTY1X1x1MDAwNO-_vTjvv71Q77-9LmpwZyIsImlzc3VlciI6Im1vZGVybi1hZ2lsZSIsImV4cGlyYXRpb24iOiIzNjAwMCIsImlhdCI6MTY1NjQ4MTExNCwiZXhwIjoxNjU2NTE3MTE0fQ.rh704DHclW2GLY1mdHVfCKztFHDtun20tJ6Kni52EjA';
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
        setData({
          ...res.data,
          msg: visitor,
          decoded: decoded(),
          token: token,
        });
      })
      .catch(err => console.log('err', err));
  }, []);

  return <> {data && <Presenter data={data} />}</>;
}

export default Post;
