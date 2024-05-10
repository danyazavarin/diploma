import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../utils/slices/userSlice';
import { authApi } from '../utils/api/authApi';

const rootReducer = combineReducers({
  userInfo: userReducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
