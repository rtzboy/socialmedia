import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalType {
	closeModal?: () => void;
	children?: JSX.Element;
}

const Modal = ({ children }: ModalType) => {
	useEffect(() => {
		if (!children) return;
		document.body.classList.add('overflow-y-hidden');
		return () => document.body.classList.remove('overflow-y-hidden');
	}, [children]);

	if (!children) return null;

	return createPortal(
		<div className='fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-slate-900/50 dark:bg-black-600/70'>
			<div className='w-full max-w-xl'>{children}</div>
		</div>,
		document.querySelector<HTMLDivElement>('#modal')!
	);
};

export default Modal;
