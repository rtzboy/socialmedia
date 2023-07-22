export interface UserPrivateInfo {
	_id: string;
	username: string;
	profilePic: string;
	gender: string;
	followers: Array<string>;
	following: Array<string>;
}

export interface UserInfo {
	id: string;
	username: string;
	email: string;
	token: string;
}

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
