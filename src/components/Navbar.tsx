import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { resetUser } from '../features/user/user-slice';
import { userSearch } from '../lib/api/user/user.api';
import Button from './form/Button';

interface UsersResult {
	username: string;
	_id: string;
}

const Navbar = () => {
	const { username, id, token } = useAppSelector(state => state.user);
	const dispatchNav = useAppDispatch();
	const [searchUser, setSearchUser] = useState('');
	const [resultUsers, setResultUsers] = useState<UsersResult[] | null>(null);
	const [hasError, setHasError] = useState('');

	const refInput = useRef<HTMLInputElement>(null);
	const [hasFocus, setHasFocus] = useState(false);

	const searching = async () => {
		const { result, error } = await userSearch(token, searchUser);
		if (result) {
			setResultUsers(result);
			setHasError('');
			return;
		}
		setHasError(error);
		setResultUsers(null);
	};

	useEffect(() => {
		if (!searchUser) {
			setResultUsers(null);
			return;
		}
		let idTimeout = setTimeout(() => {
			searching();
		}, 300);
		return () => clearTimeout(idTimeout);
	}, [searchUser]);

	useEffect(() => {
		if (document.hasFocus() && refInput.current?.contains(document.activeElement)) {
			setHasFocus(true);
		}
	}, []);

	return (
		<div className='h-[70px] w-full'>
			<nav className='fixed z-50 h-[70px] w-full bg-slate-100 shadow-lg shadow-slate-300'>
				<div className='mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4'>
					<div>
						<ul className='flex items-center gap-4'>
							<li>
								<NavLink to='/'>InterAct</NavLink>
							</li>
							<li className='relative'>
								<input
									ref={refInput}
									onFocus={() => setHasFocus(true)}
									onBlur={() => {
										setTimeout(() => {
											setHasFocus(false);
										}, 100);
									}}
									value={searchUser}
									onChange={evt => setSearchUser(evt.target.value)}
									placeholder='Search'
									type='text'
									className='w-[250px] rounded-lg px-2 py-1 outline-none'
								/>
								<div
									className={`absolute top-0 -z-10 flex h-0 w-[258px] flex-col gap-1 overflow-hidden rounded-lg bg-slate-100 shadow-lg transition-all duration-[400ms] ease-in-out ${
										hasFocus ? '-left-2 h-[250px] pt-10' : 'left-0'
									}`}
								>
									{!!hasError && <div className='italic text-red-500'>{hasError}</div>}
									{resultUsers?.map(user => (
										<div
											key={user._id}
											className='mx-1 rounded-lg transition-all hover:bg-slate-300'
										>
											<NavLink
												to={`/profile/${user._id}`}
												className='inline-block w-full cursor-pointer p-2'
											>
												<span>
													{user.username}{' '}
													{user._id === id ? <span className='text-gray-400'>(You)</span> : ''}
												</span>
											</NavLink>
										</div>
									))}
								</div>
							</li>
						</ul>
					</div>
					<div>
						<ul className='flex items-center gap-4'>
							<li>
								<NavLink to={`/profile/${id}`}>{username}</NavLink>
							</li>
							<li>
								<Button onClick={() => dispatchNav(resetUser())} className='bg-blue-300'>
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
