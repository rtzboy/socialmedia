import { UserInfo } from '../../types/user.model';

export const saveAuthLocale = (key: string, userAuth: UserInfo) => {
	try {
		if (!localStorage) console.log('localStorage not supported');
		localStorage.setItem(key, JSON.stringify(userAuth));
	} catch (error) {
		console.log(error);
	}
};

export const removeAuthLocale = (key: string) => {
	try {
		if (!localStorage) console.log('localStorage not supported');
		localStorage.removeItem(key);
	} catch (error) {
		console.log(error);
	}
};
