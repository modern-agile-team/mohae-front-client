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
import {
  get_user_specs,
  get_user_tohelp,
  get_user_helpme,
} from '../../../redux/spec/reducer';
import { useGetRequest } from '../../../redux/axios';

interface Props {
  [key: string]: any;
}

export default function MyPage({}: Props) {
  const ENDPOINT = `https://mo-hae.site/`;
  const SPEC = `specs/profile?`;
  const BOARDS = `boards/profile?`;
  const target = {
    0: '&target=false',
    // 받을래요
    1: '&target=true',
    // 해줄래요
  };
  const userId = useParams().no;
  const userInfo = useSelector((state: RootState) => state.mypage.user.profile);
  const posts = useSelector((state: RootState) => state.spec);
  const specs = useSelector((state: RootState) => state.spec.profileSpecs);
  const toHelp = useSelector((state: RootState) => state.spec.profileToHelp);
  console.log('posts :>> ', posts);
  // console.log(`specs`, specs);
  // console.log(`toHelp`, toHelp);
  const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1YnJvQG5hdmVyLmNvbSIsInVzZXJObyI6MSwiaXNzdWVyIjoibW9kZXJuLWFnaWxlIiwiZXhwaXJhdGlvbiI6IjM2MDAwIiwiaWF0IjoxNjU1OTQ3MjA4LCJleHAiOjE2NTU5ODMyMDh9.R1nmhFSqTFcEk5uJoke8ec97gqz7G0PdKt5mtriFH0E';
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

  useGetRequest(`${SPEC}user=${userId}&take=6&page=1`, TOKEN, get_user_specs);
  useGetRequest(
    `${BOARDS}user=${userId}&take=6&page=1${target[1]}`,
    TOKEN,
    get_user_tohelp
  );
  useGetRequest(
    `${BOARDS}user=${userId}&take=6&page=1${target[0]}`,
    TOKEN,
    get_user_helpme
  );
  useGetRequest(`profile/${userId}`, TOKEN, get_user_info);

  return (
    <Presenter text={text} userInfo={userInfo && userInfo} posts={posts} />
  );
}
// container
