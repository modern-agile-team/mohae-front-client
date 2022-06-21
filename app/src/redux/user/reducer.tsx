/** @format */

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const HOST = `http://localhost:8000/members`;

const USER_LOGIN = 'user_login';

const getData = createAsyncThunk('user_login', async () => {
  const response = await axios('http://localhost:8000/response').then(
    (res) => res.data.response
  );
  return response;
});
// console.log('getData :>> ', getData);

const initialState = {
  var: { isLoading: false },
  user: { name: 'lee', age: 0, id: 0 },
  token: 0,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {})
      .addCase(getData.fulfilled, (state, { payload }) => {})
      .addCase(getData.rejected, (state, { payload }) => {});
  },
});
// 생성 추가 삭제
export const { user_login, addAge, updateToken } = userSlice.actions;
// create actions & type
export default userSlice.reducer;
// action, reducer, store
