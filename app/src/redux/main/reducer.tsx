/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { customAxios } from '../../apis/instance';
import { ENDPOINT } from '../../utils/ENDPOINT';

const asyncThunk = (name: string, param: string) =>
  createAsyncThunk<any, void, {}>(name, async () => {
    const response = await customAxios.get(`${ENDPOINT}${param}`);
    return response.data;
  });

export const getHotAll = asyncThunk('getHotBoardAll', `boards/hot?select=0`);
export const getHotProgressing = asyncThunk(
  'getHotBoardProgressing',
  `boards/hot?select=1`,
);
export const getHotOver = asyncThunk('getHotBoardOver', `boards/hot?select=2`);

const initialState = {
  isLoading: true,
  allBoard: [],
  inProgressBoard: [],
  overedBoard: [],
};

export const main = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: builder => {
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

export default main.reducer;
