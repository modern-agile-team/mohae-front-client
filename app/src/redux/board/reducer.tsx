import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
} from '@reduxjs/toolkit';
import { Data } from '../../pages/board/Board';

const initialState: Data = {
  category: { boards: [] },
  categoryName: '',
};

// initialState에 받을 key가 있어야 함.

export const board = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setCategorys: (state, action: PayloadAction<any>) => {
      state.category = action.payload;
    },
    setCategoryName: (state, action: PayloadAction<any>) => {
      state.categoryName = action.payload;
    },
  },
});

export const { setCategorys, setCategoryName } = board.actions;
export default board.reducer;
