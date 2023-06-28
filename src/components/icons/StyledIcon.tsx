import { IconType } from 'react-icons';

type StyledIconProps = {
	icon: IconType;
	size?: string;
	className?: string;
	stroke?: string;
	onClick?: () => void;
};

const StyledIcon = ({ icon: Icon, size, className, stroke, onClick }: StyledIconProps) => {
	return (
		<span onClick={onClick} className={`${className || ''}`}>
			<Icon size={size || '1.3rem'} className={stroke} />
		</span>
	);
};

export default StyledIcon;
