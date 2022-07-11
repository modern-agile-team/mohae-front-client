/** @format */

import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './main/reducer';
import userReducer from './user/reducer';
import mypageReducer from './mypage/reducer';
import modalReducer from './modal/reducer';
import filterReducer from './filter/reducer';
import postReducer from './post/reducer';
import boardReducer from './board/reducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    main: mainReducer,
    mypage: mypageReducer,
    modal: modalReducer,
    post: postReducer,
    filter: filterReducer,
    board: boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
