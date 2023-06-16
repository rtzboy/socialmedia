import httpAxiosService from '../../helpers/axiosService';

const getNewFeeds = async (token: string) => {
	try {
		const response = await httpAxiosService().get('/posts/feed', {
			headers: { Authorization: `Bearer ${token}` }
		});
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

export { getNewFeeds };
