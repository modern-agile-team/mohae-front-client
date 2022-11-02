/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getNoticePost,
  createNotice,
  editNoticePost,
  searchNoticePost,
} from '../../apis/notice';
import { NoticePostType } from '../../apis/notice';

export const getNotices = createAsyncThunk(
  'notices/getNotices',
  async (body: string) => {
    const response = await getNoticePost(body);
    return response.data;
  },
);

export const createNoticePost = createAsyncThunk(
  'notices/createNoticePost',
  async (data: NoticePostType) => {
    const response = data.editForm
      ? await editNoticePost(data)
      : await createNotice(data);
    return response.data;
  },
);

export const searchNotices = createAsyncThunk(
  'notices/searchNotices',
  async (data: { params?: string; search: string }) => {
    const response = await searchNoticePost(data);
    return response.data;
  },
);

interface NoticeType {
  isLoading: boolean;
  post: object[];
}

const initialState: NoticeType = {
  isLoading: true,
  post: [],
};
// store (state)

export const notice = createSlice({
  name: 'notice',
  initialState,
  // reducer function
  reducers: {
    // create reducers
    // [GET_OVER]: (state, action: PayloadAction<any>) => {
    //   state.overedBoard = action.payload;
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(getNotices.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getNotices.fulfilled, (state, action) => {
        state.post = action.payload.response;
        state.isLoading = false;
      })
      .addCase(getNotices.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(searchNotices.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(searchNotices.fulfilled, (state, action) => {
        state.post = action.payload.response;
        state.isLoading = false;
      })
      .addCase(searchNotices.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});
// 생성 추가 삭제
// export const {
// get_in_progress, get_over
// } = main.actions;
// create actions & type
export default notice.reducer;
// action, reducer, store

// response >> Array
