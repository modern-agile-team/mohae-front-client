import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

// export const checked = createSlice(
//   JSON.parse(
//     localStorage.getItem('filterChecked') ||
//       JSON.stringify({
//         정렬: { 0: false, 1: true, 2: false },
//         대상: { 0: false, 1: false },
//         기간: { 0: false, 1: false, 2: false, 3: false },
//         무료: { 0: false },
//       })
//   )
// );

const initialState = {
  정렬: { 0: false, 1: true, 2: false },
  대상: { 0: false, 1: false },
  기간: { 0: false, 1: false, 2: false, 3: false },
  무료: { 0: false },
};

const filter = createSlice({
  name: 'msgbox',
  initialState,
  reducers: {},
});

export const {} = filter.actions;
export default filter.reducer;
