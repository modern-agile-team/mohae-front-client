/** @format */

import { useState, useEffect } from 'react';
import { injectGlobal, cx, css } from '@emotion/css';
import {
  Categories,
  Category,
  OrderedImg,
  MarkBox,
  Img,
  NewPost,
  Carousel,
} from '../../components';
import Edit from '../spec/Edit';
import Spec from '../spec';
import Visit from '../spec/Visit';

import { RootState, AppDispatch } from '../../redux/root';
import { Profile, LoginModal } from '../../pages';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import TestImg from './test';
import OtherPage from '../mypage/mypage/OtherPage';
import { spec_create } from '../../redux/modal/reducer';

interface BODY {
  title: string;
  description: string;
  image: FormData;
}

export default function HG() {
  const isOpen = useSelector((state: RootState) => state.modal.openSpecCreate);
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(spec_create(!isOpen));
  };

  return (
    <>
      {/* <Spec /> */}
      {/* <button onClick={openModal}>BUTTON</button> */}

      {/* <Visit /> */}
    </>
  );
}
