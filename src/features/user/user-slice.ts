import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from '../../types/user.model';

const initialUserState: UserInfo = {
	username: '',
	email: '',
	token: ''
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialUserState,
	reducers: {
		// actions
		createUser(_, action) {
			// immer makes it inmutable under the hood no needed {...state, bla bla bla}
			return action.payload;
		}
	}
});

export const { createUser } = userSlice.actions;

export default userSlice.reducer;
