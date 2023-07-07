import { UserFeeds } from '../../../types/user.model';
import httpAxiosService from '../../helpers/axiosService';

const makePost = async (postStr: string, token: string) => {
	try {
		const response = await httpAxiosService(token).post('/posts/create', {
			content: postStr
		});
		if (response.status === 200) {
			const newPost: UserFeeds = {
				_id: response.data.success._id,
				content: response.data.success.content,
				author: response.data.success.author,
				likeCount: response.data.success.likeCount,
				likes: response.data.success.likes,
				comments: response.data.success.comments,
				createdAt: response.data.success.createdAt,
				updatedAt: response.data.success.updatedAt
			};
			return { success: true, newPost, message: response.data.message };
		}
		return { success: false, newPost: null, message: 'error ' };
	} catch (err: any) {
		return { success: false, newPost: null, message: err.message };
	}
};

const editPost = async (token: string, value: string, idPost: string) => {
	try {
		const response = await httpAxiosService(token).patch(`posts/edit/${idPost}`, {
			content: value
		});
		if (response.status === 200) return true;
		return false;
	} catch (error) {
		return false;
	}
};

const deletePost = async (token: string, idPost: string) => {
	try {
		const response = await httpAxiosService(token).delete(`/posts/delete/${idPost}`);
		if (response.status === 200) return true;
		return false;
	} catch (error: any) {
		return false;
	}
};

const updatelikeCount = async (token: string, idPost: string, likeStatus: boolean) => {
	try {
		const res = await httpAxiosService(token).patch(`/posts/toggleLikePost/${idPost}`, {
			toggleStatus: likeStatus
		});
		if (res.status === 200) return true;
		return false;
	} catch (error) {
		return false;
	}
};

const getNewFeeds = async (token: string) => {
	try {
		const response = await httpAxiosService(token).get('/posts/feed');
		if (response.status === 200) {
			return { success: true, feeds: response.data.feeds };
		}
		if (response.status === 204) {
			return { success: false, feeds: null, msg: 'Not following anyone' };
		}
		return { success: false, feeds: null, msg: 'Something wrong happened!' };
	} catch (err: any) {
		return { success: false, msg: err.message };
	}
};

export { deletePost, editPost, getNewFeeds, makePost, updatelikeCount };
