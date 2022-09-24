import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AsyncThunkAction,
} from '@reduxjs/toolkit';
import { PostData, Data } from '../../pages/board/Container';

interface InitialState extends Data {
  loading: boolean;
}

const initialState: InitialState = {
  loading: true,
  response: [],
};

export const board = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setResCategorys: (state, action: PayloadAction<PostData[]>) => {
      state.response = [...state.response, ...action.payload];
      state.loading = false;
    },
    setResFiltering: (state, action: PayloadAction<PostData[]>) => {
      state.response = [...state.response, ...action.payload];
      state.loading = false;
    },
    setResArrEmpty: state => {
      state.response = [];
      state.loading = true;
    },
  },
});

export const { setResCategorys, setResFiltering, setResArrEmpty } =
  board.actions;
export default board.reducer;
