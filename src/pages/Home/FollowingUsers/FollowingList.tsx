import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import ConnectionManager from '../../../components/socketclient/ConnectionManager';
import { ChatBoxContext } from '../../../lib/contexts/ChatBoxContext';
import httpAxiosService from '../../../lib/helpers/axiosService';
import { socket } from '../../../socket';
import ChatBox, { MessageListType } from './ChatBox';
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

	const [selectedUser, setSelectedUser] = useState<FollowingListT[]>([]);

	const handleConnect = useCallback(() => {
		socket.emit('joinuser', id);
		socket.emit('update_user_state');
		setIsConnected(true);
	}, [id]);

	const handleUpdateUserStatus = (val: OnlineUsersT[]) => setOnlineUsers(val);

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

	const handleSelectedUsers = (user: FollowingListT) => {
		if (selectedUser.some(({ _id }) => _id === user._id)) return;
		setSelectedUser(prevUsers => [...prevUsers, user]);
	};

	const handleCloseChat = (chatId: string) => {
		setSelectedUser(selectedUser.filter(user => user._id !== chatId));
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
	}, [handleConnect]);

	// TODO: test open chat from socket
	const handleOpenChatBox = useCallback(
		(userChat: MessageListType) => {
			if (selectedUser.some(({ _id }) => _id === userChat.id)) return;
			handleSelectedUsers({
				_id: userChat.id,
				profilePic: userChat.pic,
				username: userChat.username
			});
		},
		[selectedUser.length]
	);

	useEffect(() => {
		socket.on('is_open', handleOpenChatBox);
		return () => {
			socket.off('is_open', handleOpenChatBox);
		};
	}, [handleOpenChatBox]);

	return (
		<>
			<ChatBoxContext.Provider value={{ handleSelectedUsers, handleCloseChat, onlineUsers }}>
				<div className='fixed right-0 top-[86px] w-full max-w-[270px] rounded-s-lg bg-slate-100 shadow-out dark:bg-black-400 dark:text-white dark:shadow-black-600'>
					<FollowingRow isConnected={isConnected} list={list} />
					<ConnectionManager />
				</div>
				<div className='fixed bottom-4 right-4 flex items-end gap-4 bg-transparent dark:bg-transparent dark:text-white'>
					{selectedUser.map(user => (
						<ChatBox key={user._id} user={user} />
					))}
				</div>
			</ChatBoxContext.Provider>
		</>
	);
};

export default FollowingList;
