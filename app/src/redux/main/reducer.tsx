/** @format */

import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

const GET_IN_PROGRESS = 'get_in_progress';

const ENDPOINT = `http://mo-hae.site:8080`;

const asyncThunk = (URL: string) =>
  createAsyncThunk<any, void, {}>('get_init', async () => {
    const response = await axios.get(`${URL}`);
    return response.data;
  });

export const getHotAll = asyncThunk(`${ENDPOINT}/boards/hot?select=0`);

const initialState = {
  isLoading: true,
  allBoard: [],
  inProgressBoard: [],
};
// store (state)

export const main = createSlice({
  name: 'user',
  initialState,
  // reducer function
  reducers: {
    // create reducers
    [GET_IN_PROGRESS]: (state, action: PayloadAction<any>) => {
      state.inProgressBoard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHotAll.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getHotAll.fulfilled, (state, { payload }) => {
        state.allBoard = payload.response;
        state.isLoading = false;
      })
      .addCase(getHotAll.rejected, (state, { payload }) => {});
  },
});
// 생성 추가 삭제
export const { get_in_progress } = main.actions;
// create actions & type
export default main.reducer;
// action, reducer, store

// areaName: "인천시"
// boardPhotoUrl: null
// decimalDay: null
// isDeadline: 0
// no: 2
// price: 10000
// target: 1
// title: "adfs"
// userNickname: "hneeddjjde"
