import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/reducer';
import mypageReducer from './mypage/reducer';
import specModalReducer from './specModal/reducer';
import modalReducer from './modal/reducer';
import specReducer from './spec/reducer';
import filterReducer from './filter/reducer';
import boardReducer from './board/reducer';
import createPostReducer from './createpost/reducer';
import postReducer from './post/reducer';
import noticeReducer from './notice/reducer';
import commentReducer from './comment/reducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    mypage: mypageReducer,
    specModal: specModalReducer,
    modal: modalReducer,
    spec: specReducer,
    filter: filterReducer,
    board: boardReducer,
    createPost: createPostReducer,
    post: postReducer,
    notice: noticeReducer,
    comment: commentReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
