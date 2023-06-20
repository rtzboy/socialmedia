import { useAppDispatch, useAppSelector } from '../app/hooks';
import { resetUser } from '../features/user/user-slice';
import Button from './form/Button';

const Navbar = () => {
	const { username } = useAppSelector(state => state.user);
	const dispatchNav = useAppDispatch();

	return (
		<div className='h-[70px]'>
			<nav className='fixed z-50 h-[70px] w-full bg-slate-100 shadow-lg shadow-slate-300'>
				<ul className='flex h-full items-center justify-center gap-16'>
					<li>SOCIAL</li>
					<li>
						<input
							type='text'
							className='rounded-md border-2 border-blue-300 px-2 py-1 outline-none'
						/>
					</li>
					<li>{username}</li>
					<li>
						<Button onClick={() => dispatchNav(resetUser())} className='bg-blue-300'>
							Logout
						</Button>
					</li>
				</ul>
			</nav>
		</div>
	);
};
export default Navbar;
