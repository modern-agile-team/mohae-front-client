/** @format */

import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
} from '@reduxjs/toolkit';
// import axios from 'axios';

const OPEN_LOGIN = 'open_login';

// const ENDPOINT = `https://mo-hae.site`;

// const asyncThunk = (name: string, param: string) =>
//   createAsyncThunk<any, void, {}>(name, async () => {
//     const response = await axios.get(`${ENDPOINT}${param}`);
//     return response.data;
//   });

// export const getHotAll = asyncThunk('getHotBoardAll', `/boards/hot?select=0`);
// ( parameter 1 >> thunk 이름, parameter 2 >> API param )

const initialState = {
  login: false,
};
// store (state)

export const modal = createSlice({
  name: 'modal',
  initialState,
  // reducer function
  reducers: {
    // create reducers
    [OPEN_LOGIN]: (state, action: PayloadAction<any>) => {
      state.login = action.payload;
    },
  },
});
// 생성 추가 삭제
export const { open_login } = modal.actions;
// create actions & type
export default modal.reducer;
// action, reducer, store

// response >> Array
