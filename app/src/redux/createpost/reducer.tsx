import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  data: {
    price: number | string;
    title: string;
    description: string;
    summary: string;
    target: number | null;
    categoryNo: string | number | null;
    areaNo: string | number | null;
    deadline: string | number | null;
    imgArr: string[];
  };
  form: FormData;
}

const initialState: InitialState = {
  data: {
    price: '0', // 정수형
    title: '', // '제목'
    description: '', // '본문 내용'
    summary: '', //없으면 null || '한 줄 요약 내용'
    target: 0, // 0, 1 === 정수형
    categoryNo: null, // 정수형
    areaNo: null, // 정수형
    deadline: null, // 정수형
    imgArr: ['logo.jpg'], // string[]
  },
  form: new FormData(),
};

const createPost = createSlice({
  name: 'create',
  initialState,
  reducers: {
    setImgs: (state, action: PayloadAction<any>) => {
      state.form = action.payload;
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
    setImgArr: (state, action: PayloadAction<any>) => {
      state.data.imgArr = [...action.payload.map((el: any) => el.img)].length
        ? [...action.payload.map((el: any) => el.img)]
        : ['logo.jpg'];
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
} = createPost.actions;
export default createPost.reducer;
