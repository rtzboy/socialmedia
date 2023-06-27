// import { UserFeeds } from '../../../components/homepage/NewFeeds';
import { UserFeeds } from '../../../components/homepage/NewFeeds';
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

const getNewFeeds = async (token: string) => {
	try {
		const response = await httpAxiosService(token).get('/posts/feed');
		if (response.status === 200) {
			return { success: true, feeds: response.data.feeds };
		}
		if (response.status === 204) {
			return { success: false, feeds: null, msg: 'Not following anyone' };
		}
		return { success: false, feeds: null, msg: 'Someting wrong happened!' };
	} catch (err: any) {
		return { success: false, msg: err.message };
	}
};

export { getNewFeeds, makePost };
