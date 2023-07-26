import { configureStore } from '@reduxjs/toolkit';
import userPostsReducer from '../features/post/user-posts-slice';
import userAuthReducer from '../features/user/user-auth-slice';
import userHeaderReducer from '../features/user/user-header-slice';
import userProfileReducer from '../features/user/user-profile-slice';

export const store = configureStore({
	reducer: {
		userAuth: userAuthReducer,
		userHeader: userHeaderReducer,
		userPosts: userPostsReducer,
		userProfile: userProfileReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
