import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/user-slice';
import userInfoReducer from '../features/user/userInfo-slice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		userGlobalInfo: userInfoReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
