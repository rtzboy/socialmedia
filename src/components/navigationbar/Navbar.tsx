import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetUser } from '../../features/user/user-slice';
import { deleteUserInfo } from '../../features/user/userInfo-slice';
import Button from '../form/Button';
import BoxSearch from './BoxSearch';

const Navbar = () => {
	const { username, id } = useAppSelector(state => state.user);
	const dispatchApp = useAppDispatch();

	return (
		<div className='h-[70px] w-full'>
			<nav className='fixed z-50 h-[70px] w-full bg-slate-100 shadow-lg shadow-slate-300'>
				<div className='mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4'>
					<div>
						<ul className='flex items-center gap-4'>
							<li>
								<NavLink to='/home'>InterAct</NavLink>
							</li>
							<li className='relative'>
								<BoxSearch />
							</li>
						</ul>
					</div>
					<div>
						<ul className='flex items-center gap-4'>
							<li>
								<NavLink to={`/profile/${id}`}>{username}</NavLink>
							</li>
							<li>
								<Button
									onClick={() => {
										dispatchApp(resetUser());
										dispatchApp(deleteUserInfo());
									}}
									className='bg-blue-300'
								>
									Logout
								</Button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};
export default Navbar;
