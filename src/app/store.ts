import { configureStore } from '@reduxjs/toolkit';
import userPostsReducer from '../features/post/user-posts-slice';
import userReducer from '../features/user/user-slice';
import userInfoReducer from '../features/user/userInfo-slice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		userGlobalInfo: userInfoReducer,
		userPosts: userPostsReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
