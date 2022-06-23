/** @format */

import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

const GET_USER_SPECS = 'get_user_specs';
const GET_USER_TOHELP = 'get_user_tohelp';
const GET_USER_HELPME = 'get_user_helpme';

const ENDPOINT = `https://mo-hae.site/profile/`;

const asyncThunk = (name: string, param: string | number) =>
  createAsyncThunk<any, void, {}>(name, async () => {
    const response = await axios.get(`${ENDPOINT}${param}`);
    return response.data;
  });

// export const getHotAll = asyncThunk('getUserInfo', 5);

const initialState = {
  isLoading: true,
  profileSpecs: [],
  profileToHelp: [],
  profileHelpMe: [],
};

export const spec = createSlice({
  name: 'spec',
  initialState,
  reducers: {
    [GET_USER_SPECS]: (state, action: PayloadAction<any>) => {
      state.profileSpecs = action.payload;
    },
    [GET_USER_TOHELP]: (state, action: PayloadAction<any>) => {
      state.profileToHelp = action.payload;
    },
    [GET_USER_HELPME]: (state, action: PayloadAction<any>) => {
      state.profileHelpMe = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(getHotAll.pending, (state, { payload }) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(getHotAll.fulfilled, (state, { payload }) => {
    //     state.allBoard = payload.response;
    //     state.isLoading = false;
    //   })
    //   .addCase(getHotAll.rejected, (state, { payload }) => {});
  },
});
// 생성 추가 삭제
export const {
  get_user_specs,
  get_user_tohelp,
  get_user_helpme,
} = spec.actions;
export default spec.reducer;
// action, reducer, store

// response >> Array
