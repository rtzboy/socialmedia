interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
}

const Button = ({ className, ...props }: ButtonProps) => {
	return <button {...props} className={`rounded-lg px-3 py-2 ${className || ''}`} />;
};
export default Button;
