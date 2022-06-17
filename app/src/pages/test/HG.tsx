/** @format */

import { useState, useEffect } from 'react';
import { injectGlobal, cx, css } from '@emotion/css';
import { Categories, Category, MarkBox, NewPost } from '../../components';
import { RootState, AppDispatch } from '../../redux/root';
import { user_login, addAge, updateToken } from '../../redux/user/reducer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Profile } from '../../pages';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../components/search/Search';
import Filter from '../../components/search/Filter';

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
      {/* <button onClick={change}>{'change'}</button>
      <div>{user.name}</div>
      <div>{user.age}</div>
      <div>{user.id}</div> */}
      {/* <MarkBox />
      <MarkBox big shape={'?'} state={'able'} /> */}
      <div
        className={cx(css`
          width: 360px;
          height: 284px;
        `)}
      >
        <NewPost page={'inMain'} board={dummyBoard} />
      </div>

      {/* <Filter /> */}
      {/* <Profile /> */}
    </>
  );
}
