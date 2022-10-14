import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostData, PostResponse } from '../../types/post/type';

interface InitialState extends PostData {
  loading: boolean;
}
interface SetPostDataAction {
  date: string;
  response: PostResponse;
}

const initialState: InitialState = {
  loading: true,
  data: {
    date: '',
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
        createdAt: '',
        endDate: '',
        deadline: 0,
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
    setPostData: (state, action: PayloadAction<SetPostDataAction>) => {
      state.data = action.payload;
      state.data.response.board.isLike =
        action.payload.response.board.isLike === true ||
        action.payload.response.board.isLike === 1
          ? true
          : false;
      state.loading = false;
    },
    setIsLike: (state, action: PayloadAction<boolean>) => {
      state.data.response.board.isLike = action.payload;
    },
    plusLikeCount: (state, action: PayloadAction<number>) => {
      state.data.response.board.likeCount = action.payload;
    },
    minusLikeCount: (state, action: PayloadAction<number>) => {
      state.data.response.board.likeCount = action.payload;
    },
    setIsDeadline: state => {
      state.data.response.board.isDeadline = Number(
        !state.data.response.board.isDeadline,
      );
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
  setIsDeadline,
} = post.actions;
export default post.reducer;
