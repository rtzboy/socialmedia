import { useRef, useState } from 'react';
import { BiLogOut, BiMoon } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { mainlogo } from '../../assets';
import { resetUser } from '../../features/user/user-slice';
import { deleteUserInfo } from '../../features/user/userInfo-slice';
import useContainNode from '../../lib/hooks/useContainNode';
import StyledIcon from '../icons/StyledIcon';
import BoxSearch from './BoxSearch';

const Navbar = () => {
	// const { username, id } = useAppSelector(state => state.user);
	const { _id, username, profilePic } = useAppSelector(state => state.userGlobalInfo);
	const dispatchApp = useAppDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const liContainerRef = useRef<HTMLLIElement>(null);

	useContainNode(liContainerRef.current, isOpen, setIsOpen);

	return (
		<div className='h-[70px] w-full'>
			<nav className='fixed z-50 h-[70px] w-full bg-slate-100 shadow-lg shadow-slate-300'>
				<div className='mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4'>
					<div>
						<ul className='flex items-center gap-4'>
							<li className='flex items-center gap-2'>
								<NavLink to='/home'>
									<img src={mainlogo} alt='mainlogo' className='w-10' />
								</NavLink>
								<span className='cursor-default text-lg font-semibold text-blue-500'>
									SocialPhere
								</span>
							</li>
							<li className='relative'>
								<BoxSearch />
							</li>
						</ul>
					</div>
					<div>
						<ul className='flex items-center gap-4'>
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
									className={`absolute right-0 top-12 w-[250px] rounded-xl bg-slate-100 p-2 shadow-out transition-all ${
										isOpen ? 'visible opacity-100' : 'invisible opacity-0'
									}`}
								>
									<ul className='flex flex-col gap-2'>
										<li onClick={() => setIsOpen(false)}>
											<NavLink
												to={`/profile/${_id}`}
												className='flex items-center gap-2 rounded-lg p-2 hover:bg-slate-300'
											>
												<StyledIcon icon={CgProfile} />
												<span className='inline-block'>See profile</span>
											</NavLink>
										</li>
										<li className='flex items-center gap-2 rounded-lg p-2 hover:bg-slate-300'>
											<StyledIcon icon={BiMoon} />
											<span>Display</span>
										</li>
										<li>
											<button
												onClick={() => {
													dispatchApp(resetUser());
													dispatchApp(deleteUserInfo());
												}}
												className='flex w-full items-center gap-2 rounded-lg p-2 hover:bg-slate-300'
											>
												<StyledIcon icon={BiLogOut} />
												<span>Logout</span>
											</button>
										</li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};
export default Navbar;
