import { Dispatch, createContext, useContext } from 'react';
import { UserPostsShape } from '../../types/posts.model';

interface UserCommentContextValue {
	setFeeds?: Dispatch<React.SetStateAction<UserPostsShape[] | undefined>>;
	feeds?: UserPostsShape[] | undefined;
}

export const UserCommentContext = createContext<UserCommentContextValue>(
	{} as UserCommentContextValue
);

export const useUserCommentContext = () => useContext(UserCommentContext);
