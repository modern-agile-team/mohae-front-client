/** @format */

import { useState, useEffect } from 'react';
import { cx, css } from '@emotion/css';
import {
  Categories,
  Category,
  OrderedImg,
  MarkBox,
  Img,
  NewPost,
  Carousel,
} from '../../components';
import { Resign, LoginModal } from '../';
import { RootState, AppDispatch } from '../../redux/root';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Profile } from '../../pages/';

export default function HG() {
  return <Profile />;
}
// 하나의 프로젝트에서 back, front >> back >> 초기 화면 > 버튼 >> 다른 url >> front
// 하나의 프로젝트 둘다, vanilla.js
// 초기 화면 그리는거 >> api method >> 기본 페이지에 기본 HTML 그리는거
