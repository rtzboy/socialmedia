import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserProfileType } from '../../types/user.model';

const initalInfoUser: UserProfileType = {
	userInfo: {
		_id: '',
		username: '',
		followers: [],
		following: []
	},
	posts: []
};

const userInfoSlice = createSlice({
	name: 'userInformation',
	initialState: initalInfoUser,
	reducers: {
		createUserInfo: (_, action: PayloadAction<UserProfileType>) => {
			return action.payload;
		},
		deleteUserInfo: () => {
			return initalInfoUser;
		}
	}
});

export const { createUserInfo, deleteUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
