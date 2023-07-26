import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { removeAuthLocale, saveAuthLocale } from '../../lib/helpers/localstorage';
import { UserAuthInfo } from '../../types/user.model';

const initAuthState: UserAuthInfo = {
	id: '',
	username: '',
	email: '',
	token: ''
};

const USER_KEY = 'user';

const userAuthSlice = createSlice({
	name: 'userauth',
	initialState: (JSON.parse(localStorage.getItem(USER_KEY)!) as UserAuthInfo) || initAuthState,
	reducers: {
		createUserAuth: (_, action: PayloadAction<UserAuthInfo>) => {
			saveAuthLocale(USER_KEY, action.payload);
			return action.payload;
		},
		resetUserAuth: () => {
			removeAuthLocale(USER_KEY);
			return initAuthState;
		}
	}
});

export const { createUserAuth, resetUserAuth } = userAuthSlice.actions;

export default userAuthSlice.reducer;
