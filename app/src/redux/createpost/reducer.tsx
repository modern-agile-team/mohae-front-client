import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ImgBasket,
  PosterInfomation,
  InitialState,
} from '../../types/createAndEditPost/type';

const initialState: InitialState = {
  loading: true,
  data: {
    price: '',
    title: '',
    description: '',
    summary: '',
    target: 0,
    categoryNo: null,
    areaNo: null,
    deadline: null,
    imgArr: [],
  },
  form: new FormData(),
};

const createPost = createSlice({
  name: 'create',
  initialState,
  reducers: {
    setImgs: (state, action: PayloadAction<FormData>) => {
      state.form = action.payload;
    },
    setAreaNum: (state, action: PayloadAction<string | number | null>) => {
      state.data.areaNo = action.payload;
    },
    setDeadline: (state, action: PayloadAction<string | number | null>) => {
      state.data.deadline = action.payload;
    },
    setCategoryNum: (state, action: PayloadAction<string | number | null>) => {
      state.data.categoryNo = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.data.title = action.payload;
    },
    setPrice: (state, action: PayloadAction<number | string>) => {
      state.data.price = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.data.description = action.payload;
    },
    setSummary: (state, action: PayloadAction<string>) => {
      state.data.summary = action.payload;
    },
    setTarget: (state, action: PayloadAction<number | null>) => {
      state.data.target = action.payload;
    },
    setImgArr: (state, action: PayloadAction<ImgBasket[]>) => {
      const { length: img } = [
        ...action.payload.map((el: ImgBasket) => el.img),
      ];
      state.data.imgArr = img
        ? [...action.payload.map((el: ImgBasket) => el.img)]
        : ['logo.jpg'];
    },
    setInitialState: state => {
      state.data = {
        price: '',
        title: '',
        description: '',
        summary: '',
        target: 0,
        categoryNo: null,
        areaNo: null,
        deadline: null,
        imgArr: [],
      };
      state.form = new FormData();
      state.loading = true;
    },
    setInfoBeforeEdit: (state, action: PayloadAction<PosterInfomation>) => {
      state.data = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
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
  setImgArr,
  setInitialState,
  setInfoBeforeEdit,
  setLoading,
} = createPost.actions;
export default createPost.reducer;
