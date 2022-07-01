/** @format */

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const GET_USER_SPECS = 'get_user_specs';
const GET_USER_TOHELP = 'get_user_tohelp';
const GET_USER_HELPME = 'get_user_helpme';
const GET_SPEC_INFO = 'get_spec_info';
const GET_SPEC_NO = 'get_spec_no';
const ADD_IMAGES = 'add_images';

const ENDPOINT = `https://mo-hae.site/specs/spec/`;

const asyncThunk = (name: string, param: string | number) =>
  createAsyncThunk<any, void, {}>(name, async () => {
    const response = await axios.get(`${ENDPOINT}${param}`);
    return response.data;
  });

export const getHotAll = asyncThunk('getUserInfo', 5);

interface INITSTATE {
  [key: string]: any;
}

const initialState: INITSTATE = {
  isLoading: true,
  profileSpecs: [],
  profileToHelp: [],
  profileHelpMe: [],
  specInfo: null,
  specNo: null,
  addImages: new FormData(),
};

export const spec = createSlice({
  name: 'spec',
  initialState,
  reducers: {
    [GET_USER_SPECS]: (state, action: PayloadAction<any>) => {
      state.profileSpecs = [...state.profileSpecs, ...action.payload];
    },
    [GET_USER_TOHELP]: (state, action: PayloadAction<any>) => {
      state.profileToHelp = [...state.profileToHelp, ...action.payload];
    },
    [GET_USER_HELPME]: (state, action: PayloadAction<any>) => {
      state.profileHelpMe = [...state.profileHelpMe, ...action.payload];
    },
    [GET_SPEC_INFO]: (state, action: PayloadAction<any>) => {
      state.specInfo = action.payload;
    },
    [GET_SPEC_NO]: (state, action: PayloadAction<any>) => {
      state.specNo = action.payload;
    },
    [ADD_IMAGES]: (state, action: PayloadAction<any>) => {
      state.addImages = action.payload;
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
  get_spec_info,
  get_spec_no,
  add_images,
} = spec.actions;
export default spec.reducer;
// action, reducer, store

// response >> Array
