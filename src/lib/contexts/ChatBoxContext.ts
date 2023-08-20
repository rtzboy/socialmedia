import { createContext, useContext } from 'react';
import { FollowingListT, OnlineUsersT } from '../../pages/Home/FollowingUsers/FollowingList';

export type ChatBoxContextT = {
	handleSelectedUsers: (user: FollowingListT) => void;
	handleCloseChat: (chatId: string) => void;
	onlineUsers: OnlineUsersT[] | undefined;
};

export const ChatBoxContext = createContext({} as ChatBoxContextT);

export const useChatBoxContext = () => useContext(ChatBoxContext);
