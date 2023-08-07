import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserPostsComment, UserPostsShape } from '../../types/posts.model';

type InitialSafe = UserPostsShape[] | null;

export const userPostsSlice = createSlice({
	name: 'userposts',
	initialState: null as InitialSafe,
	reducers: {
		setUserPosts: (_, action: PayloadAction<InitialSafe>) => {
			return action.payload;
		},
		createUserPost: (state, action: PayloadAction<UserPostsShape>) => {
			return [action.payload, ...(state || [])];
		},
		insertCommentToPost: (
			state,
			action: PayloadAction<{ userComment: UserPostsComment; idPost: string }>
		) => {
			if (!state) return;
			const idxPost = state.findIndex(({ _id }) => _id === action.payload.idPost);
			state[idxPost].comments = [action.payload.userComment, ...state[idxPost].comments];
		},
		toggleLikeUserPost: (
			state,
			action: PayloadAction<{ idPost: string; likeState: boolean; userId: string }>
		) => {
			if (!state) return;
			let idxPost = state.findIndex(post => post._id === action.payload.idPost);
			if (action.payload.likeState) {
				state[idxPost].likes = state[idxPost].likes.filter(
					userId => userId !== action.payload.userId
				);
				state[idxPost].likeCount--;
			} else {
				state[idxPost].likes.push(action.payload.userId);
				state[idxPost].likeCount++;
			}
		},
		updateSinglePost: (state, action) => {
			let indxPost = state!.findIndex(({ _id }) => _id === action.payload.idPost);
			state![indxPost].likeCount = action.payload.likeCount;
			state![indxPost].likes = action.payload.likes;
			state![indxPost].comments = action.payload.comments;
		}
	}
});

export const {
	setUserPosts,
	createUserPost,
	toggleLikeUserPost,
	insertCommentToPost,
	updateSinglePost
} = userPostsSlice.actions;

export default userPostsSlice.reducer;
