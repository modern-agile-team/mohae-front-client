import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardResponse, BoardDetails } from '../../types/board/type';

interface InitialState extends BoardResponse {
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
    setResCategorys: (state, action: PayloadAction<BoardDetails[]>) => {
      state.response = [...state.response, ...action.payload];
      state.loading = false;
    },
    setResFiltering: (state, action: PayloadAction<BoardDetails[]>) => {
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
