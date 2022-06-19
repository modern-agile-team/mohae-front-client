/** @format */

import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './main/reducer';
import modalReducer from './modal/reducer';
import filterReducer from './filter/reducer';
import userReducer from './user/reducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    main: mainReducer,
    filter: filterReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
