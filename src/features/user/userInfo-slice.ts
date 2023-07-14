import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserPrivateInfo } from '../../types/user.model';

const privateInfo: UserPrivateInfo = {
	_id: '',
	username: '',
	profilePic: '',
	gender: '',
	followers: [],
	following: []
};

const userPrivateSlice = createSlice({
	name: 'userInformation',
	initialState: privateInfo,
	reducers: {
		createUserInfo: (_, action: PayloadAction<UserPrivateInfo>) => {
			return action.payload;
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
		deleteUserInfo: () => {
			return privateInfo;
		}
	}
});

export const { createUserInfo, deleteUserInfo, followState } = userPrivateSlice.actions;

export default userPrivateSlice.reducer;
