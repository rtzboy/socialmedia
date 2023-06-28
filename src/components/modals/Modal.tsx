import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalType {
	closeModal: () => void;
	children?: JSX.Element;
}

const Modal = ({ closeModal, children }: ModalType) => {
	useEffect(() => {
		if (!children) return;
		document.body.classList.add('overflow-y-hidden');
		return () => document.body.classList.remove('overflow-y-hidden');
	}, [children]);

	if (!children) return null;

	return createPortal(
		<div className='fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/50'>
			<div>{children}</div>
		</div>,
		document.querySelector<HTMLDivElement>('#modal')!
	);
};

export default Modal;
