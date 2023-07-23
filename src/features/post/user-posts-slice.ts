import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserPostsShape } from '../../types/posts.model';

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
		}
	}
});

export const { setUserPosts, createUserPost, toggleLikeUserPost } = userPostsSlice.actions;

export default userPostsSlice.reducer;
