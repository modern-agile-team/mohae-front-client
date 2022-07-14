import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
} from '@reduxjs/toolkit';
import { Data } from '../../pages/board/Board';

const initialState: Data = {
  response: [],
};

export const board = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setCategorys: (state, action: PayloadAction<[]>) => {
      state.response = [...action.payload];
    },
  },
});

export const { setCategorys } = board.actions;
export default board.reducer;
