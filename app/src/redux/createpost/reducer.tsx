import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: {
  data: {
    price: number | string;
    title: string;
    description: string;
    summary: string;
    target: true | null;
    categoryNo: string | number | null;
    areaNo: string | number | null;
    deadline: string | number | null;
    img: string[];
  };
} = {
  data: {
    price: '',
    title: '',
    description: '',
    summary: '',
    target: null,
    categoryNo: null,
    areaNo: null,
    deadline: null,
    img: ['logo.jpg'],
  },
};

const createPost = createSlice({
  name: 'create',
  initialState,
  reducers: {
    setImgs: (state, action: PayloadAction<any>) => {
      state.data.img = [...action.payload.map((el: any) => el.img)].length
        ? [...action.payload.map((el: any) => el.img)]
        : ['logo.jpg'];
    },
    setAreaNum: (state, action: PayloadAction<any>) => {
      state.data.areaNo = action.payload;
    },
    setDeadline: (state, action: PayloadAction<any>) => {
      state.data.deadline = action.payload;
    },
    setCategoryNum: (state, action: PayloadAction<any>) => {
      state.data.categoryNo = action.payload;
    },
    setTitle: (state, action: PayloadAction<any>) => {
      state.data.title = action.payload;
    },
    setPrice: (state, action: PayloadAction<any>) => {
      state.data.price = action.payload;
    },
    setDescription: (state, action: PayloadAction<any>) => {
      state.data.description = action.payload;
    },
    setSummary: (state, action: PayloadAction<any>) => {
      state.data.summary = action.payload;
    },
    setTarget: (state, action: PayloadAction<any>) => {
      state.data.target = action.payload;
    },
  },
});

export const {
  setImgs,
  setAreaNum,
  setDeadline,
  setCategoryNum,
  setTitle,
  setPrice,
  setDescription,
  setSummary,
  setTarget,
} = createPost.actions;
export default createPost.reducer;
