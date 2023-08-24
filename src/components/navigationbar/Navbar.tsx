import { useRef, useState } from 'react';
import { BiLogOut, BiMoon } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { mainlogo } from '../../assets';
import { resetUserAuth } from '../../features/user/user-auth-slice';
import { deleteUserHeader } from '../../features/user/user-header-slice';
import useContainNode from '../../lib/hooks/useContainNode';
import StyledIcon from '../icons/StyledIcon';
import BoxSearch from './BoxSearch';
import Notification from './Notification';
import ThemeOpts from './ThemeOpts';

const Navbar = () => {
	const { _id, username, profilePic } = useAppSelector(state => state.userHeader);
	const dispatchApp = useAppDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const [display, setDisplay] = useState(false);
	const liContainerRef = useRef<HTMLLIElement>(null);

	useContainNode(liContainerRef.current, isOpen, setIsOpen);

	let openOpts = isOpen ? 'visible opacity-100' : 'invisible opacity-0';

	return (
		<nav className='h-[70px] w-full'>
			<div className='fixed z-50 h-[70px] w-full bg-slate-100 shadow-lg shadow-slate-300 dark:bg-black-400 dark:shadow-black-600'>
				<div className='mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4'>
					<ul className='flex items-center gap-4'>
						<li>
							<NavLink to='/home' className='flex items-center gap-2'>
								<img src={mainlogo} alt='mainlogo' className='w-10' />
								<span className='hidden text-xl font-semibold tracking-wide text-blue-500 dark:text-emerald-300 sm:block'>
									SocialPhere
								</span>
							</NavLink>
						</li>
						<li className='relative'>
							<BoxSearch />
						</li>
					</ul>
					<ul className='flex items-center gap-4 dark:text-white'>
						<Notification />
						<li ref={liContainerRef} className='relative'>
							<div
								onClick={() => setIsOpen(!isOpen)}
								className='flex cursor-pointer select-none items-center gap-4'
							>
								<img
									src={profilePic}
									alt={username}
									className='inline-block h-10 w-10 rounded-full object-cover'
								/>
								<span className='inline-block'>{username}</span>
							</div>
							<div
								className={`absolute right-0 top-12 w-[250px] rounded-xl bg-slate-100 p-2 shadow-out transition-all dark:bg-black-400 dark:shadow-black-600 ${openOpts}`}
							>
								{display ? (
									<ThemeOpts setDisplay={setDisplay} />
								) : (
									<ul className='flex flex-col gap-2'>
										<li onClick={() => setIsOpen(false)}>
											<NavLink
												to={`/profile/${_id}`}
												className='flex items-center gap-2 rounded-lg p-2 hover:bg-slate-300 dark:hover:bg-emerald-950'
											>
												<StyledIcon icon={CgProfile} />
												<span className='inline-block'>See profile</span>
											</NavLink>
										</li>
										<li
											onClick={() => setDisplay(true)}
											className='flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-slate-300 dark:hover:bg-emerald-950'
										>
											<StyledIcon icon={BiMoon} />
											<span>Display</span>
										</li>
										<li>
											<button
												onClick={() => {
													dispatchApp(resetUserAuth());
													dispatchApp(deleteUserHeader());
												}}
												className='flex w-full items-center gap-2 rounded-lg p-2 hover:bg-slate-300 dark:hover:bg-emerald-950'
											>
												<StyledIcon icon={BiLogOut} />
												<span>Logout</span>
											</button>
										</li>
									</ul>
								)}
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
