/** @format */

import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './main/reducer';
import userReducer from './user/reducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    main: mainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
