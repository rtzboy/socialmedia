import { useEffect, useState } from 'react';
import { DISPLAY_OPT, LOCAL_DISPLAY } from '../../constants/string_helpers';
import { checkDocTheme, displayTheme, getThemeValue } from '../helpers/localstorage';

const useThemeDisplay = () => {
	const initialState = () => getThemeValue(LOCAL_DISPLAY) || DISPLAY_OPT.System;
	const [theme, setTheme] = useState(initialState);

	const setDarkTheme = (theme: string) => {
		setTheme(theme);
		displayTheme(theme);
	};

	useEffect(() => {
		checkDocTheme(theme);
	}, [theme]);

	return { setDarkTheme };
};

export default useThemeDisplay;
