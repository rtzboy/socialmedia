import { useEffect, useReducer, useRef, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { userSearch } from '../../lib/api/user/user.api';
import useContainNode from '../../lib/hooks/useContainNode';
import { INITIAL_SEARCH_QUERY, searchUsersReducer } from '../../lib/reducers/searchUsersReducer';
import LoadIcon from '../icons/LoadIcon';
import StyledIcon from '../icons/StyledIcon';

const BoxSearch = () => {
	const { id, token } = useAppSelector(state => state.userAuth);
	const [searchUsers, dispatchSearch] = useReducer(searchUsersReducer, INITIAL_SEARCH_QUERY);
	const [openSearch, setOpenSearch] = useState(false);

	const refInput = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!searchUsers.search) return;
		let idTimeout = setTimeout(() => {
			handleSearch();
		}, 300);
		return () => clearTimeout(idTimeout);
	}, [searchUsers.search]);

	useContainNode(refInput.current, openSearch, setOpenSearch);

	const handleSearch = async () => {
		dispatchSearch({ type: 'START_SEARCH' });
		const { success, result, error } = await userSearch(token, searchUsers.search);
		if (!success || error) return dispatchSearch({ type: 'ERROR_SEARCH', payload: error });
		dispatchSearch({ type: 'SET_USERS_SEARCH', payload: result });
	};

	return (
		<div>
			<div ref={refInput} onClick={() => setOpenSearch(true)} className='relative dark:text-white'>
				<input
					value={searchUsers.search}
					onChange={evt => {
						dispatchSearch({ type: 'QUERY_SEARCH', payload: evt.target.value });
						if (evt.target.value === '') dispatchSearch({ type: 'RESET_SEARCH' });
					}}
					placeholder='Search'
					type='text'
					className='w-[250px] rounded-lg bg-white px-2 py-1 outline-none dark:bg-black-300'
				/>
				{searchUsers.search &&
					(searchUsers.loading ? (
						<span className='absolute right-2 top-1/2 -translate-y-1/2 text-slate-800 transition-all dark:text-emerald-300'>
							<LoadIcon className='h-5 animate-spin' />
						</span>
					) : (
						<StyledIcon
							onClick={() => dispatchSearch({ type: 'RESET_SEARCH' })}
							icon={HiXMark}
							className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-700 transition-all hover:bg-slate-100 dark:text-emerald-300 dark:hover:bg-emerald-950'
						/>
					))}
				<div
					className={`absolute top-0 -z-10 flex h-0 w-[258px] flex-col gap-1 overflow-hidden rounded-lg bg-slate-100 shadow-lg transition-all duration-[400ms] ease-in-out dark:bg-black-400 ${
						openSearch ? '-left-2 h-[250px] pt-10' : 'left-0'
					}`}
				>
					{searchUsers.usersData?.length === 0 ? (
						<div className='px-4 pt-1 italic text-slate-600'>No users found!</div>
					) : null}
					{searchUsers.usersData?.map(user => (
						<div
							key={user._id}
							className='mx-1 rounded-lg transition-all hover:bg-slate-300 dark:hover:bg-emerald-950'
						>
							<NavLink
								onClick={evt => {
									evt.stopPropagation();
									setOpenSearch(prevBool => !prevBool);
								}}
								to={`/profile/${user._id}`}
								className='flex w-full cursor-pointer items-center gap-2 p-2'
							>
								<img src={user.profilePic} alt={user.username} className='h-8 w-8 rounded-full' />
								<span>
									{user.username}{' '}
									{user._id === id ? <span className='text-gray-400'>(You)</span> : ''}
								</span>
							</NavLink>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BoxSearch;
