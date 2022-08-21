/** @format */

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USER_LOGIN = 'user_login';
const UPDATE_REGIST_INFO = 'update_regist_info';

const getData = createAsyncThunk('user_login', async () => {
  const response = await axios('http://localhost:8000/response').then(
    res => res.data.response,
  );
  return response;
});

const initialState = {
  var: { isLoading: false },
  user: { name: 'lee', age: 0, id: 0 },
  token: 0,
  registInfo: {
    email: '',
    password: '',
    name: '',
    nickname: '',
    phone: '',
    manager: false,
    school: null,
    major: null,
    categories: [
      // 0,
      // 0
    ],
    terms: [
      // true,
      // true,
      // false
    ],
  },
};
// store (state)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // reducer function
  reducers: {
    // create reducers
    [USER_LOGIN]: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    addAge: (state, action: PayloadAction<any>) => {
      state.user.age = action.payload;
    },
    updateToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
    },
    [UPDATE_REGIST_INFO]: (state, action: PayloadAction<any>) => {
      state.registInfo = action.payload;
    },
    update_regist_extraInfo: (state, action: PayloadAction<any>) => {
      console.log(action.payload.phoneNumber);
      state.registInfo.phone = action.payload.phoneNumber;
      state.registInfo.categories = action.payload.categories;
      state.registInfo.major = action.payload.major;
      state.registInfo.school = action.payload.school;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getData.pending, state => {})
      .addCase(getData.fulfilled, (state, { payload }) => {})
      .addCase(getData.rejected, (state, { payload }) => {});
  },
});
// 생성 추가 삭제
export const {
  user_login,
  addAge,
  updateToken,
  update_regist_info,
  update_regist_extraInfo,
} = userSlice.actions;
// create actions & type
export default userSlice.reducer;
// action, reducer, store
