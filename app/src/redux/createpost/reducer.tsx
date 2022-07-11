import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: {
  data: {};
} = { data: {} };

const createPost = createSlice({
  name: 'create',
  initialState,
  reducers: {},
});

export const {} = createPost.actions;
export default createPost.reducer;
