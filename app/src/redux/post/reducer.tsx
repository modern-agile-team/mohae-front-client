import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Props } from '../../pages/post/Container';

interface InitialState extends Props {
  loading: boolean;
}

const initialState: InitialState = {
  loading: true,
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
      state.loading = false;
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
    setInitialState: state => {
      state.loading = true;
      state.data = initialState.data;
    },
  },
});

export const {
  setPostData,
  setIsLike,
  plusLikeCount,
  minusLikeCount,
  setInitialState,
} = post.actions;
export default post.reducer;
