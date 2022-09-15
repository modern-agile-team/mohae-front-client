/** @format */

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ENDPOINT } from '../../utils/ENDPOINT';
import { profile } from '../../apis/user';
import {
  BoardSpec,
  getFindSpecData,
  getWantedSpecData,
  Spec,
} from '../../apis/spec';
import { getSpecData, getSpecDetail } from '../../apis/spec';
const GET_USER_SPECS = 'get_user_specs';
const GET_USER_TOHELP = 'get_user_tohelp';
const GET_USER_HELPME = 'get_user_helpme';
const GET_SPEC_INFO = 'get_spec_info';
const GET_SPEC_NO = 'get_spec_no';
const ADD_IMAGES = 'add_images';

const asyncThunk = (name: string, param: string | number) =>
  createAsyncThunk<any, void, {}>(name, async () => {
    const response = await axios.get(`${ENDPOINT}${param}`);
    return response.data;
  });

export const getSpecs = createAsyncThunk(
  'profile/getSpec',
  async (body: Spec) => {
    const { paramNo, takeParam } = body;
    const response = await getSpecData(paramNo, takeParam);
    return response.data;
  },
);

export const getDetailSpec = createAsyncThunk(
  'profile/getSpecDetail',
  async (no: number) => {
    const response = await getSpecDetail(no);
    return response.data;
  },
);

export const getFindSpecs = createAsyncThunk(
  'profile/getFindSpec',
  async (body: BoardSpec) => {
    const { paramNo, takeParam, target } = body;
    const findSpecs = await getFindSpecData(paramNo, takeParam, target);
    const wantedSpecs = await getWantedSpecData(paramNo, takeParam, target);
    return { findSpecs, wantedSpecs };
  },
);

interface INITSTATE {
  [key: string]: any;
}

const initialState: INITSTATE = {
  isLoading: true,
  profileSpecs: [],
  profileToHelp: [],
  profileHelpMe: [],
  profileInfo: {},
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
    setInitialState: state => {
      state.profileSpecs = [];
      state.profileToHelp = [];
      state.profileHelpMe = [];
      state.specInfo = null;
      state.specNo = null;
      state.addImages = new FormData();
    },
    Init_Form: state => {
      state.addImages = new FormData();
    },
  },
  extraReducers: builder => {
    // builder
    //   .addCase(getHotAll.pending, (state, { payload }) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(getHotAll.fulfilled, (state, { payload }) => {
    //     state.allBoard = payload.response;
    //     state.isLoading = false;
    //   })
    //   .addCase(getHotAll.rejected, (state, { payload }) => {});

    builder
      .addCase(getSpecs.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getSpecs.fulfilled, (state, { payload }) => {
        state.profileSpecs = payload.response;
        state.isLoading = false;
      })
      .addCase(getSpecs.rejected, (state, { payload }) => {})
      .addCase(getFindSpecs.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getFindSpecs.fulfilled, (state, { payload }) => {
        state.profileToHelp = payload.findSpecs.data.response;
        state.profileHelpMe = payload.wantedSpecs.data.response;
        state.isLoading = false;
      })
      .addCase(getFindSpecs.rejected, (state, { payload }) => {})
      .addCase(getDetailSpec.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getDetailSpec.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.specInfo = payload.response;
      })

     
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
  setInitialState,
  Init_Form,
} = spec.actions;
export default spec.reducer;
// action, reducer, store

// response >> Array
