import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserPostsShape } from '../../types/posts.model';
import { GeneralUserInfo } from '../../types/user.model';

type InitGeneralInfo = GeneralUserInfo | null;

export const userProfileSlice = createSlice({
	name: 'userprofile',
	initialState: null as InitGeneralInfo,
	reducers: {
		setGeneralInfo: (_, action: PayloadAction<GeneralUserInfo>) => {
			return action.payload;
		},
		infiniteScrollPost: (state, action: PayloadAction<UserPostsShape[]>) => {
			if (!state) return;
			state.userProfilePosts = [...state.userProfilePosts, ...action.payload];
		},
		toggleLikeProfilePost: (
			state,
			action: PayloadAction<{ idPost: string; likeState: boolean; userId: string }>
		) => {
			if (!state) return;
			let idxPost = state.userProfilePosts.findIndex(post => post._id === action.payload.idPost);
			if (action.payload.likeState) {
				state.userProfilePosts[idxPost].likes = state.userProfilePosts[idxPost].likes.filter(
					userId => userId !== action.payload.userId
				);
				state.userProfilePosts[idxPost].likeCount--;
			} else {
				state.userProfilePosts[idxPost].likes.push(action.payload.userId);
				state.userProfilePosts[idxPost].likeCount++;
			}
		}
	}
});

export const { setGeneralInfo, toggleLikeProfilePost, infiniteScrollPost } =
	userProfileSlice.actions;

export default userProfileSlice.reducer;
