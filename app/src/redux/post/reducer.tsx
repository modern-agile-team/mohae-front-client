import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { Props } from '../../pages/post/Container';

const initialState: Props = {
  data: {
    date: '',
    msg: '',
    token: '',
    decoded: {
      email: '',
      exp: 0,
      expiration: '',
      iat: 0,
      issuer: '',
      nickname: '',
      photoUrl: '',
      userNo: 0,
    },
    response: {
      authorization: false,
      board: {
        areaName: '',
        areaNo: 0,
        boardPhotoUrls: '',
        categoryName: '',
        categoryNo: 0,
        decimalDay: 0,
        hit: 0,
        isDeadline: 0,
        likeCount: 0,
        majorName: '',
        nickname: '',
        no: 0,
        price: 0,
        summary: '',
        target: 0,
        title: '',
        userNo: 0,
        userPhotoUrl: '',
      },
    },
  },
};

// initialState에 받을 key가 있어야 함.

export const post = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { setPostData } = post.actions;
export default post.reducer;
