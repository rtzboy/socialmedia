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
	createdAt: string;
	updatedAt: string;
}

interface AuthorInterface {
	_id: string;
	username: string;
}
