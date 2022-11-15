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
  openRegister: false,
  // Spec
};
// store (state)

export const specModal = createSlice({
  name: 'specModal',
  initialState,
  // reducer function
  reducers: {
    // create reducers
    [OPEN_LOGIN]: (state, action: PayloadAction<any>) => {
      state.openLogin = action.payload;
    },
    open_register_modal: (state, action: PayloadAction<any>) => {
      state.openLogin = action.payload;
      state.openRegister = true;
    },
    [CLOSE_ALL]: (state, action: PayloadAction<any>) => {
      state.openLogin = action.payload;
      state.openRegister = false;
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
  open_register_modal,
} = specModal.actions;
// create actions & type
export default specModal.reducer;

// action, reducer, store

// response >> Array
