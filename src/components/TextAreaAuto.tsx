import { ChangeEvent, Dispatch, MouseEvent, RefObject, SetStateAction, useEffect } from 'react';

type TextAreaAutoProps = {
	setContentTxt: (str: string) => void;
	setSelectText?: Dispatch<SetStateAction<{ start: number; end: number }>>;
	contentTxt: string;
	textareaRef: RefObject<HTMLTextAreaElement>;
	className?: string;
	placeholder?: string;
	stateAdd?: boolean;
};

const TextAreaAuto = ({
	setContentTxt,
	setSelectText,
	contentTxt,
	textareaRef,
	className,
	placeholder,
	stateAdd
}: TextAreaAutoProps) => {
	// const refTextArea = useRef<HTMLTextAreaElement>(null);

	const handleChangeTextArea = (evt: ChangeEvent<HTMLTextAreaElement>) =>
		setContentTxt(evt.target?.value);

	const handlerClickTextArea = (evt: MouseEvent<HTMLTextAreaElement, globalThis.MouseEvent>) => {
		const { selectionStart, selectionEnd } = evt.currentTarget;
		if (!setSelectText) return;
		setSelectText({ start: selectionStart, end: selectionEnd });
	};

	useEffect(() => {
		if (stateAdd) textareaRef.current?.focus();
		if (textareaRef.current) {
			textareaRef.current.style.height = '0px';
			const scrollHeight = textareaRef.current?.scrollHeight;
			textareaRef.current.style.height = scrollHeight + 'px';
		}
	}, [textareaRef.current, contentTxt]);

	return (
		<textarea
			value={contentTxt}
			ref={textareaRef}
			className={`max-h-[50vh] w-full resize-none outline-none ${className || ''}`}
			placeholder={placeholder}
			onChange={handleChangeTextArea}
			onClick={handlerClickTextArea}
		></textarea>
	);
};

export default TextAreaAuto;
