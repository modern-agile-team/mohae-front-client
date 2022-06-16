/** @format */

import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { keyframes } from '@emotion/react';
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

export default function MyPage() {
  const URL = `http://mo-hae.site:8080/boards/profile?user=5&take=3&page=3&target=true`;

  const text: { [key: string]: any } = {
    sir: '님',
    registerDate: '가입일 :',
    logout: '로그아웃',
    interesting: '관심사',
    resume: {
      spec: '내 스펙 관리',
      give: '해줄래요 이력',
      got: '받을래요 이력',
    },
    rating: '총 평점',
  };
  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <Presenter text={text} />;
}
