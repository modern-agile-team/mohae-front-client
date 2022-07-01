/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ENDPOINT = `https://mo-hae.site`;

const asyncThunk = (name: string, param: string) =>
  createAsyncThunk<any, void, {}>(name, async () => {
    const response = await axios.get(`${ENDPOINT}${param}`);
    return response.data;
  });

export const getHotAll = asyncThunk('getHotBoardAll', `/boards/hot?select=0`);
export const getHotProgressing = asyncThunk(
  'getHotBoardProgressing',
  `/boards/hot?select=1`
);
export const getHotOver = asyncThunk('getHotBoardOver', `/boards/hot?select=2`);

const initialState = {
  isLoading: true,
  allBoard: [],
  inProgressBoard: [],
  overedBoard: [],
};
// store (state)

export const main = createSlice({
  name: 'main',
  initialState,
  // reducer function
  reducers: {
    // create reducers
    // [GET_OVER]: (state, action: PayloadAction<any>) => {
    //   state.overedBoard = action.payload;
    // },
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
    builder
      .addCase(getHotProgressing.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getHotProgressing.fulfilled, (state, { payload }) => {
        state.inProgressBoard = payload.response;
        state.isLoading = false;
      })
      .addCase(getHotProgressing.rejected, (state, { payload }) => {});
    builder
      .addCase(getHotOver.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getHotOver.fulfilled, (state, { payload }) => {
        state.overedBoard = payload.response;
        state.isLoading = false;
      })
      .addCase(getHotOver.rejected, (state, { payload }) => {});
  },
});
// 생성 추가 삭제
// export const {
// get_in_progress, get_over
// } = main.actions;
// create actions & type
export default main.reducer;
// action, reducer, store

// response >> Array
