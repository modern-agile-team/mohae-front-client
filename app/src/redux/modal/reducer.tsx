/** @format */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const OPEN_LOGIN = 'open_login';
const CLOSE_ALL = 'close_all';

const initialState = {
  openLogin: false,
};
// store (state)

export const modal = createSlice({
  name: 'modal',
  initialState,
  // reducer function
  reducers: {
    // create reducers
    [OPEN_LOGIN]: (state, action: PayloadAction<any>) => {
      state.openLogin = action.payload;
    },
    [CLOSE_ALL]: (state, action: PayloadAction<any>) => {
      state.openLogin = false;
    },
  },
});
// 생성 추가 삭제
export const { open_login, close_all } = modal.actions;
// create actions & type
export default modal.reducer;
// action, reducer, store

// response >> Array
