import { createSlice } from '@reduxjs/toolkit';
import { removeAuthLocale, saveAuthLocale } from '../../lib/helpers/localstorage';
import { UserInfo } from '../../types/user.model';

const initialUserState: UserInfo = {
	id: '',
	username: '',
	email: '',
	token: ''
};

const USER_KEY = 'user';

const userSlice = createSlice({
	name: 'user',
	initialState: (JSON.parse(localStorage.getItem(USER_KEY)!) as UserInfo) || initialUserState,
	reducers: {
		// actions
		createUser(_, action) {
			// immer makes it inmutable under the hood no needed {...state, bla bla bla}
			saveAuthLocale(USER_KEY, action.payload);
			return action.payload;
		},
		resetUser: () => {
			removeAuthLocale(USER_KEY);
			return initialUserState;
		}
	}
});

export const { createUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
