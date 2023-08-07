import { DISPLAY_OPT, LOCAL_DISPLAY } from '../../constants/string_helpers';
import { UserAuthInfo } from '../../types/user.model';

export const saveAuthLocale = (key: string, userAuth: UserAuthInfo) => {
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

export const getThemeValue = (key: string) => {
	try {
		if (!localStorage) console.log('localStorage not supported');
		return localStorage.getItem(key);
	} catch (error) {
		console.log(error);
	}
};

export const checkDocTheme = (theme: string) => {
	if (
		theme === DISPLAY_OPT.Dark ||
		localStorage.theme === DISPLAY_OPT.Dark ||
		(!(LOCAL_DISPLAY in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
	) {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
};

export const displayTheme = (theme: string) => {
	if (theme === DISPLAY_OPT.System) localStorage.removeItem(LOCAL_DISPLAY);
	else localStorage.setItem(LOCAL_DISPLAY, theme);
};
