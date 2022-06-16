/** @format */

import { useState, useEffect } from 'react';
import { injectGlobal, cx, css } from '@emotion/css';
import { Categories, Category, MarkBox } from '../../components';
import { RootState, AppDispatch } from '../../redux/root';
import { user_login, addAge, updateToken } from '../../redux/user/reducer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Profile } from '../../pages';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../components/search/Search';
import Filter from '../../components/search/Filter';

export default function HG() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const HOST = `http://mo-hae.shop:8080/boards/profile?user=5&take=6&page=1&target=true`;

  useEffect(() => {
    axios
      .get(HOST)
      .then((res) => {
        console.log(res.data);
        // dispatch(user_login(response.data[0]));
      })
      .catch((err) => {
        console.log(`err`, err);
      });
  }, []);

  const change = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(user_login({ ...user, name: 'han', age: user.age + 1 }));
  };

  return (
    <>
      {/* <button onClick={change}>{'change'}</button>
      <div>{user.name}</div>
      <div>{user.age}</div>
      <div>{user.id}</div> */}
      <MarkBox />
      <MarkBox big shape={'?'} state={'able'} />
      {/* <Filter /> */}
      {/* <Profile /> */}
    </>
  );
}
