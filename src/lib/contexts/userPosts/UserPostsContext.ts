import { Dispatch, createContext, useContext } from 'react';
import { UserProfileAction } from '../../reducers/userProfileReducer';

interface UserPostsContextValue {
	dispatchUserProfile: Dispatch<UserProfileAction>;
	token: string;
}

export const UserPostsContext = createContext<UserPostsContextValue>({} as UserPostsContextValue);

export const useUserPostsContext = () => useContext(UserPostsContext);
