import { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useAppSelector } from '../../app/hooks';
import StyledIcon from '../../components/icons/StyledIcon';
import httpAxiosService from '../../lib/helpers/axiosService';

type FriendListT = {
	_id: string;
	profilePic: string;
	username: string;
};

const FriendList = () => {
	const { token } = useAppSelector(state => state.userAuth);
	const [list, setList] = useState<FriendListT[]>();

	useEffect(() => {
		handleCallFriendsList();
	}, []);

	const handleCallFriendsList = async () => {
		const response = await httpAxiosService(token).get('/userpriv/following/list/');
		if (response.status === 200) {
			setList(response.data.list.following);
		} else {
			console.log('error');
		}
	};

	return (
		<div className='fixed right-0 top-[86px] w-full max-w-[250px] shadow-out dark:shadow-black-600'>
			<ul className='rounded-s-lg p-4 dark:bg-black-400 dark:text-white'>
				<li className='mb-2 flex gap-2'>
					<StyledIcon
						onClick={() => {}}
						icon={BsArrowLeft}
						className='cursor-pointer rounded-full p-1 hover:bg-slate-300 dark:hover:bg-emerald-950'
					/>
					<span className='inline-block text-xl font-semibold'>Following List</span>
				</li>
				{list?.map(elm => (
					<li
						key={elm._id}
						className='flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-all dark:hover:bg-black-300'
					>
						<img src={elm.profilePic} alt='jpg' className='inline-block h-8 w-8 rounded-full' />
						<span>{elm.username}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FriendList;
