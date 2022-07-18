import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: {
  data: {
    price: string | number;
    title: string;
    description: string;
    summary: string;
    target: true;
    categoryNo: string | number;
    areaNo: string | number;
    deadline: string | number;
    img: string[];
  };
} = {
  data: {
    price: '',
    title: '',
    description: '',
    summary: '',
    target: true,
    categoryNo: '',
    areaNo: '',
    deadline: '',
    img: [],
  },
};

const createPost = createSlice({
  name: 'create',
  initialState,
  reducers: {
    setImgs: (state, action: PayloadAction<any>) => {
      state.data.img = [...action.payload.map((el: any) => el.img)];
    },
  },
});

export const { setImgs } = createPost.actions;
export default createPost.reducer;
