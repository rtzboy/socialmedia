import { ChangeEvent, useEffect, useRef } from 'react';

type TextAreaAutoProps = {
	setContentTxt: (str: string) => void;
	contentTxt: string;
	className?: string;
	placeholder?: string;
	stateAdd?: boolean;
};

const TextAreaAuto = ({
	contentTxt,
	stateAdd,
	setContentTxt,
	className,
	placeholder
}: TextAreaAutoProps) => {
	const refTextArea = useRef<HTMLTextAreaElement>(null);

	const handleChangeTextArea = (evt: ChangeEvent<HTMLTextAreaElement>) =>
		setContentTxt(evt.target?.value);

	useEffect(() => {
		if (stateAdd) refTextArea.current?.focus();
		if (refTextArea.current) {
			refTextArea.current.style.height = '0px';
			const scrollHeight = refTextArea.current?.scrollHeight;
			refTextArea.current.style.height = scrollHeight + 'px';
		}
	}, [refTextArea.current, contentTxt]);

	return (
		<textarea
			value={contentTxt}
			ref={refTextArea}
			className={`max-h-[50vh] w-full resize-none outline-none ${className || ''}`}
			placeholder={placeholder}
			onChange={handleChangeTextArea}
		></textarea>
	);
};

export default TextAreaAuto;
