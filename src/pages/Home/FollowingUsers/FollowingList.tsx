import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import ConnectionManager from '../../../components/socketclient/ConnectionManager';
import httpAxiosService from '../../../lib/helpers/axiosService';
import { socket } from '../../../socket';
import FollowingRow from './FollowingRow';

export type FollowingListT = {
	_id: string;
	profilePic: string;
	username: string;
};

export type OnlineUsersT = { socketId: string; userId: string };

const FollowingList = () => {
	const { token, id } = useAppSelector(state => state.userAuth);
	const [list, setList] = useState<FollowingListT[]>();
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [onlineUsers, setOnlineUsers] = useState<OnlineUsersT[]>();

	const handleUpdateUserStatus = (val: OnlineUsersT[]) => {
		setOnlineUsers(val);
	};

	const handleConnect = () => {
		socket.emit('joinuser', id);
		socket.emit('update_user_state');
		setIsConnected(true);
	};

	const handleDisconnect = () => {
		setIsConnected(false);
		setOnlineUsers(undefined);
	};

	const handleCallFriendsList = async () => {
		const response = await httpAxiosService(token).get('/userpriv/following/list/');
		if (response.status === 200) {
			setList(response.data.list.following);
		} else {
			console.log('error');
		}
	};

	useEffect(() => {
		handleCallFriendsList();

		socket.on('connect', handleConnect);
		socket.on('disconnect', handleDisconnect);
		socket.on('following_users', handleUpdateUserStatus);

		return () => {
			socket.off('connect', handleConnect);
			socket.off('disconnect', handleDisconnect);
			socket.off('following_users', handleUpdateUserStatus);
		};
	}, []);

	return (
		<div className='fixed right-0 top-[86px] w-full max-w-[270px] rounded-s-lg bg-slate-100 shadow-out dark:bg-black-400 dark:text-white dark:shadow-black-600'>
			<FollowingRow isConnected={isConnected} list={list} onlineUsers={onlineUsers} />
			<ConnectionManager />
		</div>
	);
};

export default FollowingList;
