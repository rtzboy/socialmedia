import { useEffect, useState } from 'react';
import { BsArrowBarLeft, BsChatDots, BsFillPeopleFill, BsNewspaper } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import StyledIcon from '../icons/StyledIcon';

type Props = {};

const Features = ({}: Props) => {
	const { _id, username } = useAppSelector(state => state.userHeader);
	const [isExpand, setIsExpand] = useState(true);

	let isOpen = isExpand ? 'w-[150px] opacity-100 pl-1' : 'w-0 opacity-0';

	useEffect(() => {
		const matchMedia = window.matchMedia('(max-width: 1024px)');
		const handleWindowMatchMedia = (evt: MediaQueryListEvent) => setIsExpand(!evt.matches);
		matchMedia.addEventListener('change', handleWindowMatchMedia);
		return () => matchMedia.removeEventListener('change', handleWindowMatchMedia);
	}, []);

	return (
		<aside className='fixed left-0 top-[86px] z-40 h-[250px] rounded-r-lg bg-slate-100 p-4 dark:bg-black-400 dark:text-white'>
			<h3 className='flex items-center overflow-hidden pb-2'>
				<StyledIcon
					onClick={() => setIsExpand(!isExpand)}
					icon={BsArrowBarLeft}
					className={`icons-opt ml-2 inline-block p-1 transition-transform ${
						isExpand ? '' : 'rotate-180'
					}`}
				/>
				<span className={`tracking-widest transition-all duration-500 ${isOpen}`}>FEATURES</span>
			</h3>
			<ul>
				<li>
					<NavLink to={`/profile/${_id}`} className={linkStyle}>
						<StyledIcon icon={CgProfile} className='block p-3' />
						<span className={`block transition-width duration-500 ${isOpen}`}>{username}</span>
					</NavLink>
				</li>
				{arrFeatures.map(feature => (
					<li key={feature.id}>
						<NavLink to={feature.to} className={linkStyle}>
							<StyledIcon icon={feature.icon} className='block p-3' />
							<span className={`block transition-width duration-500 ${isOpen}`}>
								{feature.name}
							</span>
						</NavLink>
					</li>
				))}
			</ul>
		</aside>
	);
};

const linkStyle = ({ isActive }: { isActive: boolean }) => {
	let style =
		'rounded-md w-full hover:text-blue-600 dark:hover:text-emerald-300 transition-colors items-center flex overflow-hidden';
	let active = isActive
		? 'bg-blue-100 dark:bg-emerald-950 text-blue-600 dark:text-emerald-300'
		: '';
	return style.concat(' ', active);
};

const arrFeatures = [
	{ id: 1, name: 'Newsfeed', to: '/home', icon: BsNewspaper },
	{ id: 2, name: 'People', to: '/people', icon: BsFillPeopleFill },
	{ id: 3, name: 'Chats', to: '/chats', icon: BsChatDots }
];

export default Features;
