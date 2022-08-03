import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
} from '@reduxjs/toolkit';
import { PostData, Data } from '../../pages/board/Board';

const initialState: Data = {
  response: [],
};

export const board = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setResCategorys: (state, action: PayloadAction<PostData[]>) => {
      state.response = [...state.response, ...action.payload];
    },
    setResFiltering: (state, action: PayloadAction<PostData[]>) => {
      state.response = [...state.response, ...action.payload];
    },
    setResArrEmpty: state => {
      state.response = [];
    },
  },
});

export const { setResCategorys, setResFiltering, setResArrEmpty } =
  board.actions;
export default board.reducer;
