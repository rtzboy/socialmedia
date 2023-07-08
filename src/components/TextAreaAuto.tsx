import { ChangeEvent, useEffect, useRef } from 'react';

type TextAreaAutoProps = {
	setContentTxt: (str: string) => void;
	contentTxt: string;
	className?: string;
};

const TextAreaAuto = ({ contentTxt, setContentTxt, className }: TextAreaAutoProps) => {
	const refTextArea = useRef<HTMLTextAreaElement>(null);

	const handleChangeTextArea = (evt: ChangeEvent<HTMLTextAreaElement>) =>
		setContentTxt(evt.target?.value);

	useEffect(() => {
		refTextArea.current?.focus();
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
			className={`max-h-[50vh] w-full resize-none bg-transparent outline-none ${className || ''}`}
			placeholder='Write somenthing here...'
			onChange={handleChangeTextArea}
		></textarea>
	);
};

export default TextAreaAuto;
