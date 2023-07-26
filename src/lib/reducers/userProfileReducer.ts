import { UserPostsShape } from '../../types/posts.model';
import { UserProfileType } from '../../types/user.model';

export const INITIAL_PROFILE = {
	userInfo: {
		_id: '',
		username: '',
		profilePic: '',
		gender: '',
		followers: [],
		following: []
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
		// Modified logic
		case 'TOGGLE_LIKE': {
			let idxPost = state.posts.findIndex(({ _id }) => _id === action.payload.postId);
			let likes = [...state.posts[idxPost].likes];
			let likeCount = state.posts[idxPost].likeCount;
			let userLikesFiltered: Array<String> = [];
			if (action.payload.toggleStatus) {
				userLikesFiltered = likes.filter(userId => userId !== action.payload.userId);
				likeCount--;
			} else {
				likes.push(action.payload.userId);
				likeCount++;
			}
			state.posts[idxPost] = {
				...state.posts[idxPost],
				likes: action.payload.toggleStatus ? userLikesFiltered : likes,
				likeCount
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
	payload: UserPostsShape;
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
