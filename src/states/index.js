/**
 * @TODO: Create Redux store
 */
import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import isPreLoadReducer from './isPreload/reducer';
import talkDetailReducer from './talkDetail/reducer';
import talksReducer from './talks/reducer';
import usersReducer from './users/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload : isPreLoadReducer,
    users: usersReducer,
    talks: talksReducer,
    talkDetail : talkDetailReducer,
  },
});

export default store;