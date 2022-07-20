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
        isLike: false,
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

export const post = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.data.response.board.isLike =
        action.payload.response.board.isLike === true ||
        action.payload.response.board.isLike === 1
          ? true
          : false;
    },
    setIsLike: (state, action: PayloadAction<any>) => {
      state.data.response.board.isLike = action.payload;
    },
    plusLikeCount: (state, action: PayloadAction<any>) => {
      state.data.response.board.likeCount = action.payload;
    },
    minusLikeCount: (state, action: PayloadAction<any>) => {
      state.data.response.board.likeCount = action.payload;
    },
  },
});

export const { setPostData, setIsLike, plusLikeCount, minusLikeCount } =
  post.actions;
export default post.reducer;
