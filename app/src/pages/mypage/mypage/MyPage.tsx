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
  const ENDPOINT = `https://mo-hae.site/`,
    SPEC = `specs/profile?`,
    BOARDS = `boards/profile?`,
    target = {
      0: '&target=false',
      // 받을래요
      1: '&target=true',
      // 해줄래요
    },
    actions = {
      specs: get_user_specs,
      toHelp: get_user_tohelp,
      helpMe: get_user_helpme,
    },
    userId = useParams().no,
    userInfo = useSelector((state: RootState) => state.mypage.user.profile),
    posts = useSelector((state: RootState) => state.spec),
    TOKEN =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVzdGFyZzFAaGFubWFpbC5uZXQiLCJ1c2VyTm8iOjUsImlzc3VlciI6Im1vZGVybi1hZ2lsZSIsImV4cGlyYXRpb24iOiIzNjAwMCIsImlhdCI6MTY1NjI0OTExNCwiZXhwIjoxNjU2Mjg1MTE0fQ.H8FvsMNRv40Z8sfiiTej2kV5i5H8Iyj0oU9DgmzgekE',
    text: { [key: string]: any } = {
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
  console.log('해줄래요 게시글들 :>> ', posts.profileToHelp);
  return (
    <Presenter
      text={text}
      userInfo={userInfo && userInfo}
      posts={posts}
      actions={actions}
    />
  );
}
// container
