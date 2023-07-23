export interface UserPostsShape {
	_id: string;
	content: string;
	author: AuthorForm;
	likes: Array<String>;
	likeCount: number;
	comments: Array<UserPostsComment>;
	createdAt: string;
	updatedAt: string;
}

export interface UserPostsComment {
	_id: string;
	user: AuthorForm;
	comment: string;
	createdAt: string;
	updatedAt: string;
}

interface AuthorForm {
	_id: string;
	username: string;
	profilePic: string;
}
