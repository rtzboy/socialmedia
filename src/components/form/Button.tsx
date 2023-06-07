interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
}

const Button = ({ className, ...props }: ButtonProps) => {
	return (
		<button {...props} type='submit' className={`rounded-lg px-3 py-2 ${className || ''}`}>
			Login
		</button>
	);
};
export default Button;
