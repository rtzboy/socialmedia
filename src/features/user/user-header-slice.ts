import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HeaderInfo } from '../../types/user.model';

const userHeader: HeaderInfo = {
	_id: '',
	username: '',
	profilePic: '',
	followers: [],
	following: []
};

const userHeaderSlice = createSlice({
	name: 'userheader',
	initialState: userHeader,
	reducers: {
		createUserHeader: (_, action: PayloadAction<HeaderInfo>) => {
			return action.payload;
		},
		updateUserHeader: (state, action) => {
			state.username = action.payload;
		},
		updatePicHeader: (state, action) => {
			state.profilePic = action.payload;
		},
		followState: (state, action: PayloadAction<{ _id: string }>) => {
			let followStatus = state.following.includes(action.payload._id);
			let followingCopy = [...state.following];
			let followingFilter: Array<string> = [];
			if (followStatus) {
				followingFilter = state.following.filter(elm => elm !== action.payload._id);
			} else {
				followingCopy.push(action.payload._id);
			}
			state.following = followStatus ? followingFilter : followingCopy;
		},
		deleteUserHeader: () => {
			return userHeader;
		}
	}
});

export const {
	createUserHeader,
	updateUserHeader,
	updatePicHeader,
	followState,
	deleteUserHeader
} = userHeaderSlice.actions;

export default userHeaderSlice.reducer;
