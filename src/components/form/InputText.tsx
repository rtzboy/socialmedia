interface InputText extends React.InputHTMLAttributes<HTMLInputElement> {
	error: boolean;
	className?: string;
	label: string;
}

const InputText = ({ error, className, type, label, ...props }: InputText) => {
	return (
		<>
			<input
				{...props}
				type={type}
				name={label}
				id={label}
				className={`peer w-full border-b-2 border-b-gray-300 px-3 py-2 pl-10 tracking-wide placeholder-transparent outline-none  transition-all duration-500 ${
					className || ''
				}`}
				placeholder={label[0].toUpperCase() + label.slice(1)}
			/>
			<label
				htmlFor={label}
				className='absolute -top-4 left-0 text-[15px] font-semibold text-black transition-all duration-500 peer-placeholder-shown:left-10 peer-placeholder-shown:top-[11px] peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-500'
			>
				{label[0].toUpperCase() + label.slice(1)}
			</label>
		</>
	);
};
export default InputText;
