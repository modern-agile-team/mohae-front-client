/** @format */

import { useState, useEffect } from 'react';
import { injectGlobal, cx, css } from '@emotion/css';
import { Categories, Category, MarkBox, NewPost } from '../../components';
import { RootState, AppDispatch } from '../../redux/root';
import { user_login, addAge, updateToken } from '../../redux/user/reducer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Profile, Login2 } from '../../pages';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export default function HG() {
  const dummyBoard = {
    areaName: '서울특별시',
    boardPhotoUrl: '111',
    decimalDay: 20,
    isDeadline: 1,
    no: 10,
    price: 1000,
    target: 1,
    title: '123-6',
    userNickname: 'hneeddjsjde',
    userNo: 2,
  };
  return (
    <>
      <Login2 />
    </>
  );
}
