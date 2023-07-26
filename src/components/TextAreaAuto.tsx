import { ChangeEvent, RefObject, useEffect } from 'react';

type TextAreaAutoProps = {
	setContentTxt: (str: string) => void;
	contentTxt: string;
	textareaRef: RefObject<HTMLTextAreaElement>;
	className?: string;
	placeholder?: string;
	stateAdd?: boolean;
};

const TextAreaAuto = ({
	setContentTxt,
	contentTxt,
	textareaRef,
	className,
	placeholder,
	stateAdd
}: TextAreaAutoProps) => {
	const handleChangeTextArea = (evt: ChangeEvent<HTMLTextAreaElement>) =>
		setContentTxt(evt.target?.value);

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
			className={`w-full resize-none outline-none ${className || ''}`}
			placeholder={placeholder}
			onChange={handleChangeTextArea}
		></textarea>
	);
};

export default TextAreaAuto;
