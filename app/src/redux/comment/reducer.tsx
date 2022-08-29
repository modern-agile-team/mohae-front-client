import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentList } from '../../components/comment/Comment';

interface InitialState {
  data: CommentList[];
}
const initialState: InitialState = {
  data: [],
};

const comment = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setCommentArr: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setInitialState: state => {
      state.data = [];
    },
    setAddCommentArr: (state, action: PayloadAction<any>) => {
      state.data = [...state.data, action.payload];
    },
    setAddReplies: (state: any, action: PayloadAction<any>) => {
      state.data = [...state.data, action.payload];
    },
  },
});

export const {
  setCommentArr,
  setAddCommentArr,
  setInitialState,
  setAddReplies,
} = comment.actions;
export default comment.reducer;
