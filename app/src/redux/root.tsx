/** @format */

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/reducer';

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
