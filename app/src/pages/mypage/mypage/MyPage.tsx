/** @format */

import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { get_user_info } from '../../../redux/mypage/reducer';
import { color, radius, font, shadow } from '../../../styles';
import Review from '../Review';
import Slide from './Slide';
import {
  Img,
  Poster,
  NewPost,
  Box,
  Profile,
  FocusBar,
  Category,
} from '../../../components';
import Presenter from './Presenter';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/root';

export default function MyPage() {
  // const URL = `https://mo-hae.site/boards/profile?user=5&take=3&page=3&target=true`;
  const ENDPOINT = `https://mo-hae.site/`;
  const dispatch = useDispatch();
  const userId = useParams().no;
  const userInfo = useSelector((state: RootState) => state.mypage.user.profile);
  const text: { [key: string]: any } = {
    sir: '님',
    registerDate: '가입일 :',
    logout: '로그아웃',
    interesting: '관심사',
    boards: '게시물',
    like: '좋아요',
    resume: {
      spec: '내 스펙 관리',
      give: '해줄래요 이력',
      got: '받을래요 이력',
    },
    rating: '총 평점',
  };
  useEffect(() => {
    axios
      .get(`${ENDPOINT}profile/${userId}`, {
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzdGFyZzFAaGFubWFpbC5uZXQiLCJ1c2VyTm8iOjUsImlzc3VlciI6Im1vZGVybi1hZ2lsZSIsImV4cGlyYXRpb24iOiIzNjAwMCIsImlhdCI6MTY1NTc0MTc1NSwiZXhwIjoxNjU1Nzc3NzU1fQ.UqRpUTUxe8SeCEfukMQOQRff3cXAS3r032lXE4wYQuE',
        },
      })
      .then((res) => {
        if (res.data.statusCode >= 200 && res.data.statusCode <= 204)
          // console.log(res.data.response.profile);
          dispatch(get_user_info(res.data.response.profile));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <Presenter text={text} userInfo={userInfo && userInfo} />;
}
