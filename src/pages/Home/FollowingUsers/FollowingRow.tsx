import { BsArrowLeft } from 'react-icons/bs';
import StyledIcon from '../../../components/icons/StyledIcon';
import SkeletonChat from '../../../components/skeletons/SkeletonChat';
import { FollowingListT, OnlineUsersT } from './FollowingList';

type Props = {
	isConnected: boolean;
	list: FollowingListT[] | undefined;
	onlineUsers: OnlineUsersT[] | undefined;
};

const FollowingRow = ({ isConnected, list, onlineUsers }: Props) => {
	let onOffClass = isConnected ? 'bg-green-400 shadow-green-300' : 'bg-red-500 shadow-red-300';

	if (list === undefined) return <SkeletonChat />;

	return (
		<ul className='p-4'>
			<li className='mb-2 flex items-center gap-2'>
				<StyledIcon
					onClick={() => {}}
					icon={BsArrowLeft}
					className='cursor-pointer rounded-full p-1 hover:bg-slate-200 dark:hover:bg-emerald-950'
				/>
				<span className='inline-block text-xl font-semibold'>Following List</span>
				<span className={`inline-block h-2 w-2 rounded-full shadow-out ${onOffClass}`} />
			</li>
			{list.map(user => (
				<FollowingUser key={user._id} user={user} onlineUsers={onlineUsers} />
			))}
		</ul>
	);
};

type FollowingUserT = {
	user: FollowingListT;
	onlineUsers: OnlineUsersT[] | undefined;
};

const FollowingUser = ({ user, onlineUsers }: FollowingUserT) => {
	let test = onlineUsers?.some(({ userId }) => userId === user._id);

	let activeUser = test ? 'bg-green-400 shadow-green-500' : 'bg-gray-300 shadow-gray-500';

	return (
		<li className='flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-all hover:bg-slate-300 dark:hover:bg-black-300'>
			<div className='relative '>
				<img src={user.profilePic} alt='jpg' className='inline-block h-8 w-8 rounded-full' />
				<div
					className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full shadow-out ${activeUser}`}
				/>
			</div>
			<span>{user.username}</span>
		</li>
	);
};

export default FollowingRow;
