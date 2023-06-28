import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { UserProfileType } from '../../../pages/Profiles/UserProfile';

interface UserPostsContextValue {
	userProfileInfo: UserProfileType | null;
	setUserProfileInfo: Dispatch<SetStateAction<UserProfileType | null>>;
	token: string;
}

export const UserPostsContext = createContext<UserPostsContextValue>({} as UserPostsContextValue);

export const useUserPostsContext = () => useContext(UserPostsContext);
