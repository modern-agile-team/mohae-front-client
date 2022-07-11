import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

interface Props {
  data: any;
}
const initialState: Props = {
  data: {
    check: {
      sort: { 0: false, 1: true, 2: false },
      target: { 0: false, 1: false },
      date: { 0: false, 1: false, 2: false, 3: false },
      free: { 0: false },
    },
    area: {
      areaName: '전체 지역',
      areaNo: '0',
    },
    price: {
      min: 0,
      max: 1000000,
    },
  },
};

const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCheck: (state, action: PayloadAction<any>) => {
      state.data.check = action.payload;
    },
    setAreaName: (state, action: PayloadAction<any>) => {
      state.data.area.areaName = action.payload;
    },
    setAreaNo: (state, action: PayloadAction<any>) => {
      state.data.area.areaNo = action.payload;
    },
    setMin: (state, action: PayloadAction<any>) => {
      state.data.price.min = action.payload;
    },
    setMax: (state, action: PayloadAction<any>) => {
      state.data.price.max = action.payload;
    },
  },
});

export const { setCheck, setAreaName, setAreaNo, setMin, setMax } =
  filter.actions;
export default filter.reducer;

// {
//   [key: string]:
//     | { [key: string]: { [key: number]: boolean } }
//     | { [key: string]: string }
//     | { [key: string]: number };
// };

// {
//   data: {
//     check: {
//       sort: { [key: string]: boolean };
//       target: { [key: string]: boolean };
//       date: { [key: string]: boolean };
//       free: { [key: string]: boolean };
//     };
//     area: {
//       areaName: string;
//       areaNo: string;
//     };
//     price: {
//       min: number;
//       max: number;
//     };
//   };
// }
