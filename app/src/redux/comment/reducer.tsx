import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentList } from '../../types/comment/type';

const initialState: { data: CommentList[] } = {
  data: [],
};

const comment = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setCommentArr: (state, action: PayloadAction<CommentList[]>) => {
      state.data = action.payload;
    },
    setInitialState: state => {
      state.data = [];
    },
    setAddCommentArr: (state, action: PayloadAction<CommentList>) => {
      state.data = [...state.data, action.payload];
    },
    setAddReplies: (state: any, action: PayloadAction<CommentList>) => {
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
