import { UserPostsShape } from './posts.model';

export interface UserAuthInfo {
	id: string;
	username: string;
	email: string;
	token: string;
}

export interface GeneralUserInfo {
	userProfileInfo: BasicUserInfo;
	userProfilePosts: UserPostsShape[];
	totalCount: number;
}

export interface BasicUserInfo {
	_id: string;
	username: string;
	profilePic: string;
	gender: string;
	followers: Array<string>;
	following: Array<string>;
}

// TODO: remove / refactor below
export interface UserProfileType {
	userInfo: {
		_id: string;
		username: string;
		profilePic: string;
		gender: string;
		followers: Array<string>;
		following: Array<string>;
	};
	posts: UserFeeds[];
}

export interface UserFeeds {
	_id: string;
	content: string;
	author: AuthorInterface;
	likes: Array<String>;
	likeCount: number;
	comments: Array<UserFeedsComment>;
	createdAt: string;
	updatedAt: string;
}

export interface UserFeedsComment {
	_id: string;
	user: {
		_id: string;
		username: string;
		profilePic: string;
	};
	comment: string;
	createdAt: string;
	updatedAt: string;
}

interface AuthorInterface {
	_id: string;
	username: string;
	profilePic: string;
}
