import { useEffect, useRef, useState } from 'react';

const useDropdown = () => {
	const [dropDown, setDropDown] = useState(false);
	const dropDownRef = useRef<HTMLDivElement>(null);
	const openDropDown = () => setDropDown(true);
	const closeDropDown = () => setDropDown(false);

	useEffect(() => {
		if (!dropDown) return;
		const handleClickOutside = (evt: MouseEvent) => {
			if (!dropDownRef.current?.contains(evt.target as Node)) closeDropDown();
		};
		document.addEventListener('click', handleClickOutside, true);

		return () => document.removeEventListener('click', handleClickOutside, true);
	}, [dropDown]);

	return { dropDown, dropDownRef, openDropDown, closeDropDown };
};

export default useDropdown;
