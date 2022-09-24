/** @format */

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { profile } from '../../apis/user';
import { useNavigate } from 'react-router-dom';

interface InitialState {
  [key: string]: any | User;
}
interface User {
  boardNum: string;
  categories: { [noAndName: string]: string }[];
  createdAt: string;
  email: string;
  isLike: boolean;
  likedUserNum: string;
  majorName: string;
  majorNo: number;
  name: string;
  nickname: string;
  phone: string;
  photo_url: null | string;
  schoolName: string;
  schoolNo: number | null;
  userNo: number;
}

const USER_LOGIN = 'user_login';
const UPDATE_REGIST_INFO = 'update_regist_info';

export const getUserData = createAsyncThunk(
  'user_login',
  async (no: number | undefined) => {
    const response = await profile(no!);
    return response.data;
  },
);

const initialState: InitialState = {
  var: { isLoading: false },
  user: {},
  token: 0,
  registInfo: {
    email: '',
    password: '',
    name: '',
    nickname: '',
    phone: null,
    manager: false,
    school: null,
    major: null,
    categories: [null],
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
    updateToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
    },
    [UPDATE_REGIST_INFO]: (state, action: PayloadAction<any>) => {
      state.registInfo = action.payload;
    },
    update_regist_extraInfo: (state, action: PayloadAction<any>) => {
      state.registInfo.phone = action.payload.phoneNumber;
      state.registInfo.categories = action.payload.categories;
      state.registInfo.major = action.payload.major;
      state.registInfo.school = action.payload.school;
    },
    remove_user: state => {
      state.user = {};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserData.pending, state => {})
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        state.user = payload.response;
      })
      .addCase(getUserData.rejected, (state, action) => {
        if (action.error.message === 'Request failed with status code 410') {
          alert('세션이 만료되었습니다');
          sessionStorage.removeItem('refresh_token');
          sessionStorage.removeItem('access_token');
          state.user = {};
          window.location.reload();
        }
      });
  },
});
// 생성 추가 삭제
export const {
  user_login,
  updateToken,
  update_regist_info,
  update_regist_extraInfo,
  remove_user,
} = userSlice.actions;
// create actions & type
export default userSlice.reducer;
// action, reducer, store
