/** @format */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  var: { isLoading: false },
  value: { name: '', age: 0, email: '' },
  token: 0,
};
// store (state)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // reducer function
  reducers: {
    // create reducers
    login: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
    addAge: (state, action: PayloadAction<any>) => {
      state.value.age = action.payload;
    },
    updateToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
    },
  },
});
// 생성 추가 삭제
export const { login, addAge, updateToken } = userSlice.actions;
// create actions & type
export default userSlice.reducer;
// action, reducer, store
