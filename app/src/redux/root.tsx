/** @format */

import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './main/reducer';
import userReducer from './user/reducer';
import mypageReducer from './mypage/reducer';
import modalReducer from './modal/reducer';
import specReducer from './spec/reducer';
import filterReducer from './filter/reducer';
import boardReducer from './board/reducer';
import createPostReducer from './createpost/reducer';
import postReducer from './post/reducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    main: mainReducer,
    mypage: mypageReducer,
    modal: modalReducer,
    spec: specReducer,
    filter: filterReducer,
    board: boardReducer,
    createPost: createPostReducer,
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
