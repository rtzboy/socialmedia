import { InputHTMLAttributes } from 'react';

interface InputRadioProps extends InputHTMLAttributes<HTMLInputElement> {
	idRBtn: string;
}

// React.ChangeEvent<HTMLInputElement>
const InputRadioBtn = ({ idRBtn, className, ...props }: InputRadioProps) => {
	return (
		<div className={`flex items-center gap-1 ${className || ''}`}>
			<input
				{...props}
				type='radio'
				name='gender'
				value={idRBtn}
				id={idRBtn}
				className='h-[15px] w-[15px] appearance-none rounded-full border border-gray-400 bg-gray-100 transition-all checked:border-[5px] checked:border-blue-500'
			/>
			<label htmlFor={idRBtn}>{idRBtn}</label>
		</div>
	);
};

export default InputRadioBtn;
