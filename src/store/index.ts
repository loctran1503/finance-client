import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from './reducers/appSlice';
import authReducer from './reducers/authSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    app:appReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false})
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
