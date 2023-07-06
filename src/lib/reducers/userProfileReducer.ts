import { UserFeeds, UserProfileType } from '../../types/user.model';

export const INITIAL_PROFILE = {
	userInfo: {
		followers: [],
		following: [],
		username: '',
		_id: ''
	},
	posts: []
};

const userProfileReducer = (state: UserProfileType, action: UserProfileAction) => {
	switch (action.type) {
		case 'SUCCESS_INFO':
			return {
				userInfo: action.payload.userInfo,
				posts: action.payload.posts
			};
		case 'CREATE_POST': {
			const newPost = {
				...state,
				posts: [action.payload, ...state.posts]
			};
			return newPost;
		}
		case 'EDIT_POST': {
			let indexUpdatePost = state.posts.findIndex(({ _id }) => _id === action.payload.id);
			state.posts[indexUpdatePost] = {
				...state.posts[indexUpdatePost],
				content: action.payload.content
			};
			return { ...state };
		}
		case 'TOGGLE_LIKE': {
			let indexToggleLike = state.posts.findIndex(({ _id }) => _id === action.payload.postId);
			let likeCount = action.payload.toggleStatus
				? --state.posts[indexToggleLike].likeCount
				: ++state.posts[indexToggleLike].likeCount;

			let likes = [...state.posts[indexToggleLike].likes];
			if (action.payload.toggleStatus) {
				likes = likes.filter(userId => userId !== action.payload.userId);
			} else {
				likes.push(action.payload.userId);
			}
			state.posts[indexToggleLike] = {
				...state.posts[indexToggleLike],
				likeCount,
				likes
			};
			return { ...state };
		}
		case 'DELETE_POST': {
			const removePost = state.posts.filter(({ _id }) => _id !== action.payload);
			return { ...state, posts: removePost };
		}
		default:
			throw new Error(`Error on action: ${action}`);
	}
};

interface UserSuccessInfo {
	type: 'SUCCESS_INFO';
	payload: UserProfileType;
}

interface UserCreatePost {
	type: 'CREATE_POST';
	payload: UserFeeds;
}

interface UserEditPost {
	type: 'EDIT_POST';
	payload: { id: string; content: string };
}

interface UserLikeTogglePost {
	type: 'TOGGLE_LIKE';
	payload: { postId: string; likeCount: number; toggleStatus: boolean; userId: string };
}

interface UserDeletePost {
	type: 'DELETE_POST';
	payload: string;
}

export type UserProfileAction =
	| UserSuccessInfo
	| UserCreatePost
	| UserEditPost
	| UserDeletePost
	| UserLikeTogglePost;

export default userProfileReducer;
