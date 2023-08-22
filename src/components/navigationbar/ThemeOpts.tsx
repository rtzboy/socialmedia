import { Dispatch, SetStateAction } from 'react';
import { BsArrowLeft, BsMoonStars } from 'react-icons/bs';
import { FiSun } from 'react-icons/fi';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import { DISPLAY_OPT } from '../../constants/string_helpers';
import useThemeDisplay from '../../lib/hooks/useDisplayTheme';
import StyledIcon from '../icons/StyledIcon';

type Props = {
	setDisplay: Dispatch<SetStateAction<boolean>>;
};

const ThemeOpts = ({ setDisplay }: Props) => {
	const { setDarkTheme } = useThemeDisplay();

	const handleDisplayTheme = async (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		setDarkTheme(evt.currentTarget.id);
		setTimeout(() => {
			setDisplay(false);
		}, 0);
	};

	return (
		<ul className='flex flex-col gap-2'>
			<li className='flex items-center gap-1 rounded-lg px-1'>
				<StyledIcon
					onClick={() => setDisplay(prevDisplay => !prevDisplay)}
					icon={BsArrowLeft}
					className='cursor-pointer rounded-full p-1 hover:bg-slate-300 dark:hover:bg-emerald-950'
				/>
				<span className='inline-block text-lg font-semibold'>Appearance</span>
			</li>
			<li
				onClick={handleDisplayTheme}
				id={`${DISPLAY_OPT.Light}`}
				className='flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-slate-300 dark:hover:bg-emerald-950'
			>
				<StyledIcon icon={FiSun} />
				<span>Light</span>
			</li>
			<li
				onClick={handleDisplayTheme}
				id={`${DISPLAY_OPT.Dark}`}
				className='flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-slate-300 dark:hover:bg-emerald-950'
			>
				<StyledIcon icon={BsMoonStars} />
				<span>Dark</span>
			</li>
			<li
				onClick={handleDisplayTheme}
				id={`${DISPLAY_OPT.System}`}
				className='flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-slate-300 dark:hover:bg-emerald-950'
			>
				<StyledIcon icon={HiOutlineComputerDesktop} />
				<span>System</span>
			</li>
		</ul>
	);
};

export default ThemeOpts;
