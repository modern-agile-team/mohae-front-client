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
    price: '0',
    title: '',
    description: '',
    summary: '',
    target: 0,
    categoryNo: null,
    areaNo: null,
    deadline: null,
    imgArr: ['logo.jpg'],
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
    setInitialState: state => {
      state.data = {
        price: '0',
        title: '',
        description: '',
        summary: '',
        target: 0,
        categoryNo: null,
        areaNo: null,
        deadline: null,
        imgArr: ['logo.jpg'],
      };
      state.form = new FormData();
    },
    setForEdit: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
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
  setForEdit,
} = createPost.actions;
export default createPost.reducer;
