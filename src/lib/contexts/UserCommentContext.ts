import { Dispatch, createContext, useContext } from 'react';
import { UserFeeds } from '../../types/user.model';

interface UserCommentContextValue {
	setFeeds?: Dispatch<React.SetStateAction<UserFeeds[] | undefined>>;
	feeds?: UserFeeds[] | undefined;
}

export const UserCommentContext = createContext<UserCommentContextValue>(
	{} as UserCommentContextValue
);

export const useUserCommentContext = () => useContext(UserCommentContext);
