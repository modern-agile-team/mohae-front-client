/** @format */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const OPEN_LOGIN = 'open_login',
  CLOSE_ALL = 'close_all',
  SPEC_VISIT = 'spec_visit',
  SPEC_EDIT = 'spec_edit',
  SPEC_CREATE = 'spec_create';
// SPEC_CREATE = 'spec_create';

const initialState = {
  openLogin: false,
  openSpecVisit: false,
  // Visit
  openSpecEdit: false,
  // Edit
  openSpecCreate: false,
  // Spec
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
      state.openLogin = action.payload;
    },
    [SPEC_VISIT]: (state, action: PayloadAction<any>) => {
      state.openSpecVisit = action.payload;
    },
    [SPEC_EDIT]: (state, action: PayloadAction<any>) => {
      state.openSpecEdit = action.payload;
    },
    [SPEC_CREATE]: (state, action: PayloadAction<any>) => {
      state.openSpecCreate = action.payload;
    },
  },
});
// 생성 추가 삭제
export const {
  open_login,
  close_all,
  spec_visit,
  spec_edit,
  spec_create,
} = modal.actions;
// create actions & type
export default modal.reducer;
// action, reducer, store

// response >> Array
