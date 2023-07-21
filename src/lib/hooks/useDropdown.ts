import { useRef, useState } from 'react';
import useContainNode from './useContainNode';

const useDropdown = () => {
	const [dropDown, setDropDown] = useState(false);
	const dropDownRef = useRef<HTMLDivElement>(null);
	const openDropDown = () => setDropDown(!dropDown);
	const closeDropDown = () => setDropDown(false);

	useContainNode(dropDownRef.current, dropDown, setDropDown);

	return { dropDown, dropDownRef, openDropDown, closeDropDown };
};

export default useDropdown;
