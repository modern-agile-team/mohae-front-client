/** @format */

import { createSlice } from '@reduxjs/toolkit';

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
    login: (state, action) => {
      state.value = action.payload;
    },
    addAge: (state, action) => {
      state.value.age = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
  },
});
// 생성 추가 삭제
export const { login, addAge, updateToken } = userSlice.actions;
// create actions & type
export default userSlice.reducer;
// action, reducer, store
