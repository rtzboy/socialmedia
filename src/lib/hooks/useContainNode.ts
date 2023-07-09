import { useEffect } from 'react';

const useContainNode = (parentNode: any, node: boolean, closeNode: (opt: boolean) => void) => {
	useEffect(() => {
		if (!node) return;
		const handleClickOutside = (evt: MouseEvent) => {
			if (!parentNode.contains(evt.target as Node)) closeNode(false);
		};
		document.addEventListener('click', handleClickOutside, true);
		return () => document.removeEventListener('click', handleClickOutside, true);
	}, [node]);
};

export default useContainNode;
