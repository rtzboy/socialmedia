import { UserPostsShape } from './posts.model';

export interface UserAuthInfo {
	id: string;
	email: string;
	token: string;
}

export interface GeneralUserInfo {
	userProfileInfo: ProfileInfo;
	userProfilePosts: UserPostsShape[];
	totalCount: number;
}

export interface HeaderInfo {
	_id: string;
	username: string;
	profilePic: string;
	followers: Array<string>;
	following: Array<string>;
}

export interface ProfileInfo extends HeaderInfo {
	gender: string;
	bio: string;
	createdAt: string;
}
